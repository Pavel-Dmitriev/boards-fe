import type { AuthKind } from "./enum";

export interface IAuthForm {
  /** Вид авторизации - вход|регистрация */
  type?: `${AuthKind}`;
}
