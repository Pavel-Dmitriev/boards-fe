import type { IProfile } from "shared/interfaces";

export interface IAuthStore {
  user: IProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: IProfile, token: string) => void;
  register: (user: IProfile, token: string) => void;
  logout: () => void;
  initialize: () => void;
}
