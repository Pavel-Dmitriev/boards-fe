import type { IRoom } from "shared/interfaces";

export interface IState {
  /** Список комнат */
  rooms: IRoom[];
  /** Текущая комната */
  room: IRoom | null;
  /** Флаг загрузки */
  isLoading: boolean;
}

export interface IAction {
  /** Получить все комнаты */
  getRooms: () => Promise<void>;
  /** Получить комнату по ID */
  getRoom: (id: string) => Promise<void>;
  /** Создать комнату */
  createRoom: (name: string, description: string) => Promise<void>;
  /** Обновить комнату */
  updateRoom: (id: string, name: string, description: string) => Promise<void>;
  /** Удалить комнату */
  deleteRoom: (id: string) => Promise<void>;
}
