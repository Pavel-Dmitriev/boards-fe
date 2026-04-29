import type { IProfile } from "../interfaces";

export interface IAuthResponse {
  /** Пользователь */
  user: IProfile;
  /** Токен */
  token: string;
}
