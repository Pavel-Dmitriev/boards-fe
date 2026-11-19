import dayjs from "dayjs";

import ReplyForm from "./ReplyForm";

import avatarPlaceholder from "assets/avatar.avif";

import type { ICommentCardProps } from "./interface";

/** Компонент карточки комментария */
export default function CommentCard(props: ICommentCardProps) {
  const {
    comment,
    replies,
    activeReplyId,
    onStartReply,
    onCancelReply,
    onSubmitReply,
    getReplies,
  } = props;
  const { id, content, author, created_at: createdAt } = comment;
  const authorName = author?.name ?? "";
  const authorAvatar = author?.avatar;
  const isReplying = activeReplyId === id;

  return (
    <article className="rounded-xl border border-violet-200 p-5 shadow-sm dark:border-white/8">
      <div className="flex gap-4">
        {authorAvatar ? (
          <img src={authorAvatar} alt="" className="h-10 w-10 rounded-full" />
        ) : (
          <img src={avatarPlaceholder} alt="" className="h-10 w-10 rounded-full object-cover" />
        )}

        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3 text-sm">
            <span className="font-semibold">{authorName}</span>

            <span className="text-gray-400 dark:text-gray-500">{dayjs(createdAt).fromNow()}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-300">{content}</p>

          <button
            type="button"
            disabled={isReplying}
            onClick={() => onStartReply(id)}
            className="mt-3 cursor-pointer text-sm font-medium text-violet-600 transition-colors hover:text-violet-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-200 dark:disabled:hover:text-violet-400"
          >
            Ответить
          </button>

          {isReplying && (
            <ReplyForm
              onSubmit={(replyContent) => onSubmitReply(id, replyContent)}
              onCancel={onCancelReply}
            />
          )}

          {replies.length > 0 && (
            <div className="mt-4 space-y-3 border-l-2 border-violet-200 pl-4 dark:border-white/10">
              {replies.map((reply) => {
                const { id: replyId } = reply;

                return (
                  <CommentCard
                    key={replyId}
                    comment={reply}
                    replies={getReplies?.(replyId) ?? []}
                    activeReplyId={activeReplyId}
                    onStartReply={onStartReply}
                    onCancelReply={onCancelReply}
                    onSubmitReply={onSubmitReply}
                    getReplies={getReplies}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
