import { RiArrowLeftLine, RiChat1Line, RiHeartLine } from "@remixicon/react";
import clsx from "clsx";
import size from "lodash-es/size";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import { CardModal, ViewToggler } from "./components";
import { NoData, Spinner } from "components/ui";
import { Button } from "components/ui/Button";
import { useModalStore } from "components/ui/Modal/store";
import { CreateCardForm } from "pages/Rooms/RoomsDetailPage/components";
import { useCardsStore, useRoomsStore } from "shared/stores";

import { useInfiniteScroll } from "shared/hooks";

import { STATUS } from "shared/constants";

import type { ViewModeType } from "./types";
import type { ICard } from "shared/interfaces";

/** Страница со списком карточек доски */
export function BoardDetailPage() {
  const { roomId, boardId } = useParams();
  const navigate = useNavigate();
  const keyRef = useRef(0);
  const [viewMode, setViewMode] = useState<ViewModeType>("list");

  const { room, getRoom } = useRoomsStore();
  const { data: cards, isLoading, page, total, limit, getCards, nextPage } = useCardsStore();
  const { open, close } = useModalStore(useShallow(({ open, close }) => ({ open, close })));

  const hasMore = page < Math.ceil(total / limit);

  const fetchMoreCards = () => {
    if (boardId) nextPage({ boardId });
  };

  const { triggerRef } = useInfiniteScroll(fetchMoreCards, {
    isLoading,
    hasMore,
    hasViewport: true,
  });

  useEffect(() => {
    if (roomId) getRoom(roomId);
  }, [roomId]);

  useEffect(() => {
    if (boardId) getCards(boardId);
  }, [boardId]);

  const handleCardClick = (card: ICard) => {
    keyRef.current += 1;
    open({
      title: "Карточка",
      children: <CardModal key={keyRef.current} card={card} />,
    });
  };

  const handleCreateCard = () => {
    if (!boardId) return;
    keyRef.current += 1;
    open({
      title: "Создать карточку",
      children: <CreateCardForm key={keyRef.current} boardId={boardId} onClose={close} />,
      buttons: (
        <>
          <Button type="button" kind="secondary" onClick={close}>
            Отмена
          </Button>
          <Button type="submit" form="card-form">
            Создать
          </Button>
        </>
      ),
    });
  };

  const hasCards = size(cards) > 0;

  return (
    <>
      <footer className="mb-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(`/rooms/${roomId}`)}
          className="flex cursor-pointer items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
        >
          <RiArrowLeftLine className="size-4" />
          Назад
        </button>
      </footer>

      <div className="mb-8 flex items-center gap-4">
        <div className="flex-1">
          <h1 className="mb-1 text-3xl font-medium">
            <span className="gradient-text">{room?.name ?? "Загрузка..."}</span>
          </h1>
          <p className="text-neutral/70 text-sm">Доска: {boardId}</p>
        </div>
        <div className="flex items-center gap-2">
          <ViewToggler viewMode={viewMode} onChange={setViewMode} />
          <Button onClick={handleCreateCard}>Создать карточку</Button>
        </div>
      </div>

      {isLoading && !hasCards && <Spinner />}

      {!isLoading && !hasCards && <NoData />}

      {hasCards && (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              : "flex flex-col gap-4"
          }
        >
          {cards.map((card) => {
            const status = STATUS[card.status];

            return (
              <article
                key={card.id}
                className={clsx(
                  "card cursor-pointer transition-shadow hover:shadow-lg",
                  viewMode === "grid" && "flex flex-col",
                )}
                onClick={() => handleCardClick(card)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleCardClick(card);
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
                  className={clsx(
                    "text-neutral/70 mb-4 text-sm",
                    viewMode === "grid" ? "line-clamp-3" : "line-clamp-2",
                  )}
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
          })}
        </div>
      )}

      <div ref={triggerRef} className="h-px w-full" />
    </>
  );
}
