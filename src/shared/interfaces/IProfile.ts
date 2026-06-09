import type { ICard } from "./ICard";

export interface IProfile {
  /** Идентификатор */
  id: number;
  /** Почта пользователя */
  email: string;
  /** Имя пользователя */
  name: string;
  /** Дата регистрации */
  createdAt: string;
  /** Карточки пользователя */
  cards: ICard[];
}
