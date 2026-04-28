import type { IUser } from "shared/interfaces";

export interface IAuthStore {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: IUser, token: string) => void;
  register: (user: IUser, token: string) => void;
  logout: () => void;
  initialize: () => void;
}
