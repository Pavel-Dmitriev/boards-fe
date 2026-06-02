import type { IBoard } from "shared/interfaces";

export interface IBoardsState {
  /** Список досок текущей комнаты */
  boards: IBoard[];
  /** Флаг загрузки */
  isLoading: boolean;
}

export interface IBoardsAction {
  /** Получить доски комнаты */
  getBoards: (roomId: string) => Promise<void>;
  /** Обновить доску */
  updateBoard: (boardId: string, title: string, description: string) => Promise<void>;
  /** Удалить доску */
  deleteBoard: (boardId: string) => Promise<void>;
  /** Поставить лайк карточке */
  toggleLike: (cardId: string) => Promise<void>;
}
