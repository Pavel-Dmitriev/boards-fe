import type { AxiosResponse } from "axios";

import { api } from "../api";

import type { IAuthResponse } from "shared/interfaces";

export const auth = {
  /** Регистрация */
  register: async (
    name: string,
    email: string,
    password: string,
  ): Promise<AxiosResponse<IAuthResponse>> => {
    return api.post<IAuthResponse>("/users/register", { name, email, password });
  },

  /** Вход */
  login: async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
    return api.post<IAuthResponse>("/users/login", { email, password });
  },
  /** Выход */
  logout: async (): Promise<void> => {
    return api.post("/users/logout");
  },
};
