import type { IUser } from "../interfaces";

export interface IAuthResponse {
  user: IUser;
  token: string;
}
