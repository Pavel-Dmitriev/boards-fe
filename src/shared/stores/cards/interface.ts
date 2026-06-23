import type { ICard } from "shared/interfaces";

/**
 * Дополнительное состояние стора карточек.
 * Расширяет базовое состояние пагинации (data, isLoading и т.д.),
 * добавленное фабрикой createResourceStore.
 */
export interface ICardsExtraState {
  /** Карточки сгруппированные по id доски */
  cardsByBoardId: Record<string, ICard[]>;
}

/**
 * Дополнительные действия стора карточек.
 * Расширяет базовые методы пагинации (fetchPage, nextPage и т.д.),
 * добавленные фабрикой createResourceStore.
 */
export interface ICardsExtraActions {
  /** Создать карточку */
  createCard: (title: string, description: string, boardId: number) => Promise<void>;
  /** Получить карточки доски */
  getCardsByBoardId: (boardId: string) => Promise<void>;
}
