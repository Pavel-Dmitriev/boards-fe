import size from "lodash-es/size";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import { CardModal } from "./components";
import HeaderModal from "./components/CardModal/components/HeaderModal";
import { Button } from "components/ui/Button";
import { useModalStore } from "components/ui/Modal/store";
import { CreateCardForm } from "pages/BoardsPage/components";
import { useBoardsStore, useCardsStore, useRoomsStore } from "shared/stores";

import { useInfiniteScroll } from "shared/hooks";

import { VIEW_MODE } from "./constants";

import type { ViewModeType } from "./types";
import type { ICard } from "shared/interfaces";

export function useControl() {
  const { boardId } = useParams();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const navigate = useNavigate();
  const keyRef = useRef(0);
  const [viewMode, setViewMode] = useState<ViewModeType>(VIEW_MODE.LIST);

  const { room, getRoom } = useRoomsStore();
  const { board, getBoard } = useBoardsStore();
  const {
    data: cards,
    isLoading,
    page,
    total,
    limit,
    getCards,
    nextPage,
    toggleVote,
  } = useCardsStore();

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
    if (boardId) {
      getBoard(boardId);
      getCards(boardId);
    }
  }, [boardId]);

  useEffect(() => {
    if (roomId) getRoom(roomId);
  }, [roomId]);

  const handleOpenModal = (card: ICard) => {
    keyRef.current += 1;

    open({
      title: <HeaderModal id={card.id} title={card.title} toggleVote={toggleVote} />,
      children: <CardModal key={keyRef.current} card={card} />,
      size: "3xl",
      className: {
        header: "grid-cols-[1fr_min-content_min-content] items-start gap-2 [&>form]:mt-1.5",
        content: "pb-1",
      },
      buttons: (
        <Button type="submit" form="card-modal-form">
          Добавить комментарий
        </Button>
      ),
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

  const handleGoBack = () => {
    if (room?.id) navigate(`/rooms/${room.id}`);
  };

  const hasCards = size(cards) > 0;

  return {
    room,
    board,
    cards,
    isLoading,
    viewMode,
    setViewMode,
    hasMore,
    hasCards,
    triggerRef,
    onOpenModal: handleOpenModal,
    onCreateCard: handleCreateCard,
    onGoBack: handleGoBack,
    toggleVote,
  };
}
