import type { IOwner } from "./IOwner";

/** Интерфейс комментария */
export interface IComment {
  /** Идентификатор */
  id: string;
  /** Контент */
  content: string;
  /** Автор комментария */
  author: IAuthor;
  /** Идентификатор родительского комментария */
  parent: { id: number } | null;
  /** Дата создания */
  created_at: string;
  /** Дата обновления */
  updated_at: string;
}

type IAuthor = IOwner;
