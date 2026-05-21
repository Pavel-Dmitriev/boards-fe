import type { ICard } from "./ICard";

/** Интерфейс доски */
export interface IBoard {
  /** Идентификатор */
  id: string;
  /** Название доски */
  title: string;
  /** Описание доски */
  description: string;
  /** Дата создания доски */
  created_at: string;
  /** Идентификатор комнаты */
  room_id: string;
  /** Владелец доски */
  owner: IOwner;
  /** Карточки */
  cards: ICard[];
}

interface IOwner {
  id: string;
  name: string;
  role?: string;
}
