/**
 * Дополнительные действия стора досок.
 * Расширяет базовые методы пагинации (fetchPage, nextPage и т.д.),
 * добавленные фабрикой createResourceStore.
 */
export interface IBoardsExtraActions {
  /** Создать доску в комнате */
  createBoard: (name: string, description: string, roomId: string) => Promise<void>;
  /** Загрузить доски комнаты (обёртка над fetchPage с roomId) */
  getBoards: (roomId: string) => Promise<void>;
  /** Обновить название и описание доски и перезапросить текущую страницу */
  updateBoard: (
    boardId: string,
    name: string,
    description: string,
    roomId: string,
  ) => Promise<void>;
  /** Удалить доску и перезапросить текущую страницу */
  deleteBoard: (boardId: string, roomId: string) => Promise<void>;
}
