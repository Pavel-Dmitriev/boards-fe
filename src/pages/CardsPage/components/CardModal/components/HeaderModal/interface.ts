export interface IHeaderModalProps {
  /** Идентификатор карточки */
  id: string;
  /** Заголовок модалки */
  title: string;
  /** Функция для переключения голоса карточки */
  toggleVote: (cardId: string) => Promise<void>;
}
