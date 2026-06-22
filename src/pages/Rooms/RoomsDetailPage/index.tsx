import isNil from "lodash-es/isNil";
import size from "lodash-es/size";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Board } from "./components";
import PageHeader from "components/PageHeader";
import { NoData, Spinner } from "components/ui";
import { useBoardsStore, useCardsStore, useRoomsStore } from "shared/stores";

import useModalAction from "./useModalAction";

/** Страница подробной информации о комнате */
export function RoomsDetailPage() {
  const { id } = useParams();

  const { room, getRoom } = useRoomsStore();

  const { boards, getBoards } = useBoardsStore();
  const { cardsByBoardId, getCardsByBoardId } = useCardsStore();

  const { onOpenCreateModal, onOpenEditModal, onOpenDeleteModal, onOpenCreateCardModal } =
    useModalAction();

  useEffect(() => {
    if (id) {
      getRoom(id);
    }
  }, []);

  useEffect(() => {
    if (id && !isNil(room)) {
      getBoards(id);
    }
  }, [room]);

  useEffect(() => {
    if (size(boards) > 0) {
      Promise.all(boards.map((board) => getCardsByBoardId(board.id)));
    }
  }, [boards]);

  if (isNil(room)) return <Spinner />;

  return (
    <>
      <PageHeader
        title={room.name}
        description={room.description}
        titleBtn="Создать доску"
        onCreate={onOpenCreateModal}
      />

      {size(boards) > 0 ? (
        <div className="grid gap-y-6">
          {boards?.map((board) => {
            const { id, name, description } = board ?? {};

            return (
              <Board
                key={`board_${id}`}
                {...board}
                cards={cardsByBoardId[id] ?? []}
                onEditBoard={() => onOpenEditModal({ id, name, description })}
                onDeleteBoard={() => onOpenDeleteModal(id)}
                onCreateCard={() => onOpenCreateCardModal(id)}
              />
            );
          })}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
