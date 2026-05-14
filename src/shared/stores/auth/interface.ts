import type { IProfile } from "shared/interfaces";

export interface IState {
  /** Пользователь */
  user: IProfile | null;
  /** Флаг авторизации */
  isAuthenticated: boolean;
  /** Флаг загрузки */
  isLoading: boolean;
}

export interface IAction {
  /** Вход */
  login: (email: string, password: string) => Promise<void>;
  /** Регистрация */
  register: (name: string, email: string, password: string) => Promise<void>;
  /** Выход */
  logout: () => Promise<void>;
  /** Проверка авторизации (обновление access token по refresh token) */
  checkAuth: () => Promise<void>;
}
