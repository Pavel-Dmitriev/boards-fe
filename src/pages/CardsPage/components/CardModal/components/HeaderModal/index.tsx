import { RiHeartFill, RiHeartLine } from "@remixicon/react";
import { useShallow } from "zustand/shallow";

import { Button } from "components/ui";
import { useCardsStore } from "shared/stores/cards";

import type { IHeaderModalProps } from "./interface";

/** Компонент заголовка модалки карточки */
export default function HeaderModal({ id, title, toggleVote }: IHeaderModalProps) {
  const { hasVoted, votesCount } = useCardsStore(
    useShallow(({ data }) => {
      const card = data.find((card) => card.id === id);

      return {
        hasVoted: card?.hasVoted ?? false,
        votesCount: card?.votesCount ?? 0,
      };
    }),
  );

  return (
    <>
      <h2 className="font-semibold">{title}</h2>
      <Button
        kind="outline"
        size="sm"
        className="group"
        leftIcon={
          hasVoted ? (
            <RiHeartFill className="relative inset-0 size-5 text-violet-500 group-hover:text-violet-300" />
          ) : (
            <RiHeartLine className="size-5 text-violet-300 group-hover:text-violet-500" />
          )
        }
        onClick={() => toggleVote(id)}
      >
        {votesCount}
      </Button>
    </>
  );
}
