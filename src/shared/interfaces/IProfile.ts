import type { IRoom } from "./IRoom";

export interface IProfile {
  /** Идентификатор */
  id: string;
  /** Почта пользователя */
  email: string;
  /** Имя пользователя */
  name: string;
  /** Дата регистрации */
  createdAt: string;
  /** Комнаты пользователя */
  rooms: IRoom[];
}
