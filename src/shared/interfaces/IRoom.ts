import type { ICard } from "./ICard";

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
  type: string;
  /** Идентификатор владельца комнаты */
  ownerId: string;
  /** Карточки комнаты */
  cards: ICard[];
  /** Дата создания */
  createdAt: string;
  /** Дата обновления */
  updatedAt: string;
}
