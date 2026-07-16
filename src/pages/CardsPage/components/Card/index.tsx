import { RiChat1Line, RiHeartFill, RiHeartLine } from "@remixicon/react";
import clsx from "clsx";
import type { MouseEvent } from "react";

import { VIEW_MODE } from "pages/CardsPage/constants";
import { STATUS } from "shared/constants";

import type { ICardProps } from "./interface";

/** Компонент карточки */
export default function Card(props: ICardProps) {
  const { card, viewMode, onOpenModal, onToggleVote } = props;

  const status = STATUS[card.status];

  const handleVote = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleVote(card.id);
  };

  return (
    <article
      className={clsx("card cursor-pointer transition-shadow hover:shadow-lg", {
        "flex flex-col": viewMode === VIEW_MODE.GRID,
      })}
      onClick={() => onOpenModal(card)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpenModal(card);
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <span
          className={clsx(
            "inline-block rounded-full px-3 py-0.5 text-xs font-medium",
            status?.className,
          )}
        >
          {status?.label}
        </span>
        <h3 className="line-clamp-1 font-medium">{card.title}</h3>
      </div>
      <p
        className={clsx("text-neutral/70 mb-4 line-clamp-2 text-sm", {
          "line-clamp-3": viewMode === VIEW_MODE.GRID,
        })}
      >
        {card.description}
      </p>
      <div className="text-neutral/70 mt-auto flex items-center gap-4 text-xs">
        <button
          type="button"
          className="group flex cursor-pointer items-center gap-1"
          onClick={handleVote}
        >
          {card.voted ? (
            <RiHeartFill className="size-3.5 text-violet-500 group-hover:text-violet-300" />
          ) : (
            <RiHeartLine className="size-3.5 group-hover:text-violet-500" />
          )}
          {card.votesCount ?? 0}
        </button>
        <span className="flex items-center gap-1">
          <RiChat1Line className="size-3.5" />
          {card.commentsCount ?? 0}
        </span>
      </div>
    </article>
  );
}
