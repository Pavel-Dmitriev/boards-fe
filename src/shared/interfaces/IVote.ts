/** Интерфейс голосования */
export interface IVote {
  /** Идентификатор пользователя */
  user_id: string;
  /** Идентификатор карточки */
  card_id: string;
  /** Дата создания голосования */
  created_at: string;
}
