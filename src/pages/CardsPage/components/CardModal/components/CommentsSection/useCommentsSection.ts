import { useState } from "react";

import { useCardsStore } from "shared/stores";

import type { IComment } from "shared/interfaces";

/**
 * Хук секции комментариев: дерево ответов и форма ответа
 * @param comments - список комментариев
 * @param cardId - идентификатор карточки
 */
export function useCommentsSection(comments: IComment[], cardId: string) {
  const { createComment } = useCardsStore();
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const rootComments = comments.filter((comment) => !comment.parent);

  /** Получить ответы по id родителя */
  const getReplies = (parentId: string) =>
    comments.filter((comment) => comment.parent && String(comment.parent.id) === String(parentId));

  /** Открыть форму ответа */
  const handleStartReply = (commentId: string) => {
    setActiveReplyId(commentId);
  };

  /** Закрыть форму ответа */
  const handleCancelReply = () => {
    setActiveReplyId(null);
  };

  /** Отправить ответ на комментарий */
  const handleSubmitReply = (parentId: string, content: string) => {
    createComment(cardId, content, parentId);
    setActiveReplyId(null);
  };

  return {
    rootComments,
    activeReplyId,
    getReplies,
    handleStartReply,
    handleCancelReply,
    handleSubmitReply,
  };
}
