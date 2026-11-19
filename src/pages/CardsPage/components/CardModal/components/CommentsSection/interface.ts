import type { IComment } from "shared/interfaces";

export interface ICommentsSectionProps {
  /** Список комментариев */
  comments: IComment[];
  /** Флаг загрузки */
  isLoading: boolean;
  /** Идентификатор карточки */
  cardId: string;
}

export interface ICommentCardProps {
  /** комментарий */
  comment: IComment;
  /** ответы на комментарий */
  replies: IComment[];
  /** id комментария с активной формой ответа */
  activeReplyId: string | null;
  /** открыть форму ответа */
  onStartReply: (commentId: string) => void;
  /** закрыть форму ответа */
  onCancelReply: () => void;
  /** отправить ответ */
  onSubmitReply: (parentId: string, content: string) => void;
  /** получить ответы по id родителя */
  getReplies?: (parentId: string) => IComment[];
}
