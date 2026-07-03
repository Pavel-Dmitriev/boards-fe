/** Интерфейс комментария */
export interface IComment {
  /** Идентификатор */
  id: string;
  /** Контент */
  content: string;
  /** Идентификатор карточки */
  card_id: string;
  /** Идентификатор родительского комментария */
  parent_id: string | null;
  /** Идентификатор автора комментария */
  author_id: string;
  /** Имя автора комментария */
  author_name?: string;
  /** Дата создания */
  created_at: string;
  /** Дата обновления */
  updated_at: string;
}
