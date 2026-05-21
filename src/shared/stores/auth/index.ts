import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

import { setAccessToken } from "shared/api";
import { auth } from "shared/api/auth";

import { getMessageError } from "shared/utils";

import { API_URL } from "shared/constants";

import type { IAction, IState } from "./interface";
import type { IAuthResponse } from "shared/interfaces";

export const useAuthStore = create<IState & IAction>((set) => {
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (email, password) => {
      try {
        const data = await auth.login(email, password).then((res) => res?.data?.data);

        const { user, accessToken, refreshToken } = data ?? {};

        setAccessToken(accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        set({ user, isAuthenticated: true });
      } catch (error) {
        toast.error(getMessageError(error));
        throw error;
      }
    },

    register: async (name, email, password) => {
      try {
        const data = await auth.register(name, email, password).then((res) => res?.data?.data);
        const { user, accessToken, refreshToken } = data ?? {};

        setAccessToken(accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        set({ user, isAuthenticated: true });
      } catch (error) {
        toast.error(getMessageError(error));
      }
    },

    logout: async () => {
      await auth.logout();
      setAccessToken(null);
      localStorage.removeItem("refreshToken");
      set({ user: null, isAuthenticated: false });
    },

    checkAuth: async () => {
      set({ isLoading: true });
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }
        // Запрашиваем через чистый axios чтобы не словить interceptors.
        const data = await axios
          .post<IAuthResponse>(
            `${API_URL}/users/refresh-token`,
            { refreshToken },
            { withCredentials: true },
          )
          .then((res) => res?.data?.data);

        const { user, accessToken, refreshToken: newRefreshToken } = data ?? {};

        setAccessToken(accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        set({ user, isAuthenticated: true });
      } catch (error) {
        setAccessToken(null);
        localStorage.removeItem("refreshToken");
        set({ user: null, isAuthenticated: false });

        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
