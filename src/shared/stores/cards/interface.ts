import type { ICard } from "shared/interfaces";

export interface IState {
  /** Список карточек */
  cards: ICard[];
  /** Карточки сгруппированные по id доски */
  cardsByBoardId: Record<string, ICard[]>;
  /** Флаг загрузки */
  isLoading: boolean;
}

export interface IAction {
  /** Создать карточку */
  createCard: (title: string, description: string, boardId: number) => Promise<void>;
  /** Получить карточки доски */
  getCardsByBoardId: (boardId: string) => Promise<void>;
}
