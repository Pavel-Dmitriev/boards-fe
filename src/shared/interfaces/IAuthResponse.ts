import type { IProfile } from "../interfaces";

export interface IAuthResponse {
  data: {
    /** Пользователь */
    user: IProfile;
    /** Access токен */
    accessToken: string;
    /** Refresh токен */
    refreshToken: string;
  };
}
