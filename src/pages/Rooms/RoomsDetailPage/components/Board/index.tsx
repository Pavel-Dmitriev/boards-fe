import { RiAddFill } from "@remixicon/react";
import clsx from "clsx";
import { size } from "lodash-es";
import type { WheelEvent } from "react";

import Card from "./components/Card";
import { ItemActions, NoData } from "components/ui";

import type { IBoardProps } from "./interface";
import type { ICard } from "shared/interfaces";

export default function Board(props: IBoardProps) {
  const { name, description, cards, owner, onEditBoard, onDeleteBoard, onCreateCard } = props ?? {};

  const hasCards = size(cards) > 0;

  const handleCardListWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <article className="card grid min-h-63 grid-cols-[28rem_1px_1fr] gap-x-6">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">{name}</h2>
          <ItemActions onEdit={onEditBoard} onDelete={onDeleteBoard} />
        </div>
        <p className="text-neutral/70 mb-4 flex-1 text-sm">{description}</p>
        <div className="flex items-end gap-x-4">
          <span className="badge text-xs">Всего карточек: {cards?.length ?? 0}</span>
          <button
            title="Добавить карточку"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onCreateCard?.();
            }}
            className="shrink cursor-pointer self-end text-purple-400 transition-colors hover:text-purple-300"
          >
            <RiAddFill className="size-6" />
          </button>
          {owner?.name && (
            <span className="text-neutral/70 grow text-end text-xs">{owner.name}</span>
          )}
        </div>
      </div>
      <div className="h-full rounded-full bg-gray-200" />
      <div
        className={clsx(
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 active:scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full dark:scrollbar-thumb-gray-500 hover:dark:scrollbar-thumb-gray-400 active:dark:scrollbar-thumb-gray-400 flex gap-3 overflow-x-auto pb-1",
          { "justify-center": !hasCards },
        )}
        onWheel={handleCardListWheel}
      >
        {hasCards ? (
          cards?.map((card: ICard) => <Card key={card?.id} card={card} />)
        ) : (
          <NoData className="mt-0" size="md" />
        )}
      </div>
    </article>
  );
}
