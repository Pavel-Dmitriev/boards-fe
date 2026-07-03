import { RiChat1Line, RiHeartLine } from "@remixicon/react";
import clsx from "clsx";

import { VIEW_MODE } from "pages/BoardDetailPage/constants";
import { STATUS } from "shared/constants";

import type { ICardProps } from "./interface";

export default function Card({ card, viewMode, onOpenModal }: ICardProps) {
  const status = STATUS[card.status];

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
        <span className="flex items-center gap-1">
          <RiHeartLine className="size-3.5" />
          {card.likes_count ?? 0}
        </span>
        <span className="flex items-center gap-1">
          <RiChat1Line className="size-3.5" />
          {card.comments_count ?? 0}
        </span>
      </div>
    </article>
  );
}
