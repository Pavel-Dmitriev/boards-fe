/** Интерфейс комментария */
export interface IComment {
  /** Идентификатор */
  id: string;
  /** Контент */
  content: string;
  /** Идентификатор карточки */
  card_id: string;
  /** Идентификатор автора комментария */
  author_id: string;
  /** Дата создания */
  created_at: string;
  /** Дата обновления */
  updated_at: string;
}
