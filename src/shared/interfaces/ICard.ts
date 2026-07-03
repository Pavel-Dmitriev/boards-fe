import type { CardStatusType } from "shared/types/CardStatusType";

/** Интерфейс карточки  */
export interface ICard {
  /** Идентификатор */
  id: string;
  /** Название */
  title: string;
  /** Описание */
  description: string;
  /** Идентификатор принадлежности карточки к доске */
  board_id: string;
  /** Идентификатор категории */
  category_id: string | null;
  /** Идентификатор автора карточки */
  author_id: string;
  /** Статус */
  status: CardStatusType;
  /** Количество лайков */
  likes_count?: number;
  /** Количество комментариев */
  comments_count?: number;
  /** Проголосовал ли текущий пользователь */
  has_voted?: boolean;
  /** Дата создания */
  created_at: string;
  /** Дата обновления */
  updated_at: string;
  /** Является участником комнаты */
  isMember: boolean;
}
