import type { IRoom } from "shared/interfaces";

/**
 * Дополнительное состояние стора комнат.
 * Расширяет базовое состояние пагинации (data, isLoading и т.д.),
 * добавленное фабрикой createResourceStore.
 */
export interface IRoomsExtraState {
  /** Текущая выбранная комната */
  room: IRoom | null;
}

/**
 * Дополнительные действия стора комнат.
 * Расширяет базовые методы пагинации (fetchPage, nextPage и т.д.),
 * добавленные фабрикой createResourceStore.
 */
export interface IRoomsExtraActions {
  /** Загрузить список комнат (обёртка над fetchPage) */
  getRooms: () => Promise<void>;
  /** Получить комнату по ID */
  getRoom: (id: string) => Promise<void>;
  /** Создать комнату */
  createRoom: (name: string, description: string) => Promise<void>;
  /** Обновить комнату */
  updateRoom: (id: string, name: string, description: string) => Promise<void>;
  /** Удалить комнату */
  deleteRoom: (id: string) => Promise<void>;
  /** Вступить в комнату */
  joinRoom: (id: string) => Promise<void>;
}
