import type { IBoard, ICard } from "shared/interfaces";

export interface IBoardsState {
  /** Список досок текущей комнаты */
  boards: IBoard[];
  /** Карточки сгруппированные по id доски */
  cardsByBoardId: Record<string, ICard[]>;
  /** Флаг загрузки */
  isLoading: boolean;
}

export interface IBoardsAction {
  /** Создать доску */
  createBoard: (name: string, description: string, roomId: string) => Promise<void>;
  /** Получить доски комнаты */
  getBoards: (roomId: string) => Promise<void>;
  /** Получить карточки доски */
  getCardsByBoardId: (boardId: string) => Promise<void>;
  /** Обновить доску */
  updateBoard: (boardId: string, name: string, description: string) => Promise<void>;
  /** Удалить доску */
  deleteBoard: (boardId: string) => Promise<void>;
}
