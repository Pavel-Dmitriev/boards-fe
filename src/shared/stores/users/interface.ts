import type { IProfile } from "shared/interfaces";

export interface IState {
  /** Профиль пользователя */
  profile: IProfile | null;
  /** Флаг загрузки */
  isLoading: boolean;
}

export interface IAction {
  /** Получить профиль */
  getProfile: () => Promise<void>;
}
