import type { ICard } from "shared/interfaces";

export interface IState {
  /** Список карточек */
  cards: ICard[];
  /** Флаг загрузки */
  isLoading: boolean;
}

export interface IAction {
  /** Создать карточку */
  createCard: (title: string, description: string, boardId: number) => Promise<void>;
}
