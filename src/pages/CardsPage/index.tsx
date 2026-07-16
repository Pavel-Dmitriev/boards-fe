import { RiArrowLeftLine } from "@remixicon/react";
import clsx from "clsx";
import isNil from "lodash-es/isNil";

import { Card, ViewToggler } from "./components";
import { Button, NoData, Spinner } from "components/ui";

import { useControl } from "./useControl";

import { VIEW_MODE } from "./constants";

/** Страница со списком карточек доски */
export function CardsPage() {
  const {
    room,
    board,
    cards,
    isLoading,
    viewMode,
    setViewMode,
    hasCards,
    triggerRef,
    onOpenModal,
    onCreateCard,
    onGoBack,
    toggleVote,
  } = useControl();

  return (
    <>
      {room?.id && (
        <footer className="mb-4 flex items-center gap-4">
          <button
            type="button"
            onClick={onGoBack}
            className="flex cursor-pointer items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
          >
            <RiArrowLeftLine className="size-4" />
            Назад
          </button>
        </footer>
      )}

      <div className="mb-8 flex items-center gap-4">
        <div className="flex-1">
          <h1 className="mb-1 text-3xl font-medium">
            {!isNil(board) && <span className="gradient-text">{board.name}</span>}
          </h1>
          {!isNil(room) && <p className="text-neutral/70 text-sm">Комната: {room.name}</p>}
        </div>

        <Button onClick={onCreateCard}>Создать карточку</Button>
      </div>

      {isLoading && !hasCards && <Spinner />}

      {!isLoading && !hasCards && <NoData />}

      {hasCards && (
        <>
          <div className="flex items-center justify-end">
            <ViewToggler viewMode={viewMode} onChange={setViewMode} className="mb-3 flex" />
          </div>

          <div
            className={clsx({
              "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3": viewMode === VIEW_MODE.GRID,
              "flex flex-col gap-4": viewMode === VIEW_MODE.LIST,
            })}
          >
            {cards.map((card) => (
              <Card key={card.id} card={card} viewMode={viewMode} onOpenModal={onOpenModal} onToggleVote={toggleVote} />
            ))}
          </div>
        </>
      )}

      <div ref={triggerRef} className="h-px w-full" />
    </>
  );
}
