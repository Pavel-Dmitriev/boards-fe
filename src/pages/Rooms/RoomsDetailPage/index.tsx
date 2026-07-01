import isNil from "lodash-es/isNil";
import size from "lodash-es/size";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Board } from "./components";
import PageHeader from "components/PageHeader";
import { NoData, Spinner } from "components/ui";
import { useBoardsStore, useRoomsStore } from "shared/stores";

import useModalAction from "./useModalAction";
import { useInfiniteScroll } from "shared/hooks";

/** Страница подробной информации о комнате */
export function RoomsDetailPage() {
  const { id } = useParams();

  const { room, getRoom } = useRoomsStore();

  const { data: boards, getBoards, nextPage, isLoading, page, total, limit } = useBoardsStore();

  const hasMore = page < Math.ceil(total / limit);

  const { onOpenCreateModal, onOpenEditModal, onOpenDeleteModal, onOpenCreateCardModal } =
    useModalAction();

  const fetchMoreBoards = () => {
    if (id) nextPage({ roomId: id });
  };

  const { triggerRef } = useInfiniteScroll(fetchMoreBoards, {
    isLoading,
    hasMore,
    hasViewport: true,
  });

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
                onEditBoard={() => onOpenEditModal({ id, name, description })}
                onDeleteBoard={() => onOpenDeleteModal(id)}
                onCreateCard={() => onOpenCreateCardModal(id)}
              />
            );
          })}

          <div ref={triggerRef} className="h-px w-full" />
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
