import type { IOwner } from "./IOwner";

import type { CardStatusType } from "shared/types/CardStatusType";

/** Интерфейс карточки  */
export interface ICard {
  /** Идентификатор */
  id: string;
  /** Название */
  title: string;
  /** Описание */
  description: string;
  /** Порядок карточки */
  order: number;
  /** Владелец карточки */
  owner: IOwner;
  /** Статус */
  status: CardStatusType;
  /** Количество голосов */
  votesCount?: number;
  /** Количество комментариев */
  commentsCount?: number;
  /** Проголосовал ли текущий пользователь */
  hasVoted: boolean;
  /** Дата создания */
  createdAt: string;
  /** Дата обновления */
  updatedAt: string;
  /** Является участником комнаты */
  isMember: boolean;
}
