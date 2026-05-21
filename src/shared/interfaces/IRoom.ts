import type { IBoard } from "./IBoard";

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
  /** Идентификатор владельца комнаты */
  ownerId: string;
  /** Доски */
  boards: IBoard[];
  /** Дата создания */
  createdAt: string;
  /** Дата обновления */
  updatedAt: string;
}
