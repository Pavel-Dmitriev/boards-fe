import type { IOwner } from "./IOwner";

/** Интерфейс комнаты */
export interface IRoom {
  id: string;
  /** Название комнаты */
  name: string;
  /** Описание комнаты */
  description: string;
  /** Статус комнаты */
  status: string;
  /** Тип комнаты */
  type: "public" | "private";
  /** Владелец комнаты */
  owner: IOwner;
  /** Количество досок */
  boardsCount: number;
  /** Дата создания */
  createdAt: string;
  /** Дата обновления */
  updatedAt?: string;
}
