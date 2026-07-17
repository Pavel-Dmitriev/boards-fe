import dayjs from "dayjs";

import avatarPlaceholder from "assets/avatar.avif";

import type { IComment } from "shared/interfaces";

/** Компонент карточки комментария */
export default function CommentCard({ comment }: { comment: IComment }) {
  return (
    <article
      key={comment.id}
      className="rounded-xl border border-violet-200 p-5 shadow-sm dark:border-white/8"
    >
      <div className="flex gap-4">
        {comment.author?.avatar ? (
          <img src={comment.author.avatar} className="h-10 w-10 rounded-full" />
        ) : (
          <img src={avatarPlaceholder} alt="" className="h-10 w-10 rounded-full object-cover" />
        )}

        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3 text-sm">
            <span className="font-semibold">{comment.author.name}</span>

            <span className="text-gray-400 dark:text-gray-500">
              {dayjs(comment.created_at).fromNow()}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
        </div>
      </div>
    </article>
  );
}
