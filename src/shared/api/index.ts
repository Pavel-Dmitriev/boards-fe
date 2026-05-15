import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import { StatusCode } from "shared/enum/StatusCode";

import { API_URL } from "shared/constants";

import type { QueueItemType } from "./types";
import type { IAuthResponse } from "shared/interfaces";

/** Access token в памяти (не сохраняется в localStorage) */
let accessToken: string | null = null;

/** Устанавливает access token в память */
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Флаг выполнения запроса на обновление токена */
let isRefreshing = false;

/** Очередь запросов, которые нужно повторить после обновления токена */
let failedQueue: QueueItemType[] = [];

/**
 * Обрабатывает очередь запросов, ожидающих обновления токена
 * @param error - ошибка обновления токена (или null при успехе)
 * @param token - новый access token (если обновление успешно)
 */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });

  failedQueue = [];
};

/**
 * Interceptor запросов: добавляет access token в заголовок Authorization
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/**
 * Interceptor ответов: при 401 пытается обновить access token через refresh token
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === StatusCode.Unauthorized && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const data = await axios
          .post<IAuthResponse>(
            `${API_URL}/users/refresh-token`,
            { refreshToken },
            { withCredentials: true },
          )
          .then((res) => res?.data?.data);

        originalRequest.headers.Authorization = `Bearer ${data?.accessToken}`;

        localStorage.setItem("refreshToken", data?.refreshToken);
        setAccessToken(data?.accessToken);

        processQueue(null, data?.accessToken);

        return api(originalRequest);
      } catch (e) {
        processQueue(e, null);
        setAccessToken(null);
        localStorage.removeItem("refreshToken");

        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
