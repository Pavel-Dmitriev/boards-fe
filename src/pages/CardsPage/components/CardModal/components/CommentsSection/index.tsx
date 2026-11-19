import CommentCard from "./CommentCard";
import { Spinner } from "components/ui";

import { useCommentsSection } from "./useCommentsSection";

import type { ICommentsSectionProps } from "./interface";

/** Компонент секции комментариев карточки */
export default function CommentsSection({ comments, isLoading, cardId }: ICommentsSectionProps) {
  const {
    rootComments,
    activeReplyId,
    getReplies,
    handleStartReply,
    handleCancelReply,
    handleSubmitReply,
  } = useCommentsSection(comments, cardId);

  return (
    <section className="mx-1 mb-4 max-w-[98.5%] border-b border-gray-300 pb-4 dark:border-white/8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Комментарии</h3>

        <span className="mr-3 inline-block rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-gray-600 dark:bg-white/10 dark:text-gray-300">
          {comments.length}
        </span>
      </div>

      {isLoading && <Spinner className={{ wrapper: "my-10 h-auto" }} size="md" />}

      {!isLoading && comments.length === 0 ? (
        <p className="py-4 text-center text-gray-400 dark:text-gray-500">Нет комментариев</p>
      ) : (
        <div className="space-y-4">
          {rootComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              replies={getReplies(comment.id)}
              activeReplyId={activeReplyId}
              onStartReply={handleStartReply}
              onCancelReply={handleCancelReply}
              onSubmitReply={handleSubmitReply}
              getReplies={getReplies}
            />
          ))}
        </div>
      )}
    </section>
  );
}
