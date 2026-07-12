import { RiChat1Line, RiHeartLine } from "@remixicon/react";
import clsx from "clsx";

import { STATUS } from "shared/constants";

import type { ICard } from "shared/interfaces";

export default function Card({ card }: { card: ICard }) {
  const status = STATUS[card.status];

  return (
    <article className="rounded-card border-border hover:border-border-hover bg-bg-card flex w-60 max-w-60 min-w-60 cursor-pointer flex-col gap-3 border p-4">
      <div className="flex items-center justify-between">
        <span
          className={clsx(
            "inline-block rounded-full px-3 py-0.5 text-xs font-medium",
            status?.className ?? "",
          )}
        >
          {status?.label}
        </span>
      </div>

      <h3 className="line-clamp-1 font-medium">{card.title}</h3>
      <p className="text-neutral/70 line-clamp-3 text-sm">{card.description}</p>

      <div className="text-neutral/70 mt-auto flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1">
          <RiHeartLine className="h-3.5 w-3.5" />
          {card.votesCount ?? 0}
        </span>
        <span className="flex items-center gap-1">
          <RiChat1Line className="h-3.5 w-3.5" />
          {card.commentsCount ?? 0}
        </span>
      </div>
    </article>
  );
}
