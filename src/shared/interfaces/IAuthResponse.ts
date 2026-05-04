import type { IProfile } from "../interfaces";

export interface IAuthResponse {
  /** Пользователь */
  user: IProfile;
  /** Access токен */
  accessToken: string;
  /** Refresh токен */
  refreshToken: string;
}
