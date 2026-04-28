import { create } from "zustand";

import type { IAuthStore } from "./interface";
import type { IUser } from "shared/interfaces";

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  initialize: () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      set({
        token,
        user: JSON.parse(userStr) as IUser,
        isAuthenticated: true,
      });
    }
  },

  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  register: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
