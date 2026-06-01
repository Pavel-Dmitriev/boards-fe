import clsx from "clsx";
import size from "lodash-es/size";
import { useEffect } from "react";

import { Header, RoomsCard } from "./components";
import { NoData, Spinner } from "components/ui";
import { useRoomsStore } from "shared/stores";

import useModalAction from "./useModalAction";

/**
 * Страница списка комнат.
 * Загружает комнаты при монтировании, отображает список карточек.
 * При пустом списке и отсутствии загрузки показывает NoData.
 */
export function RoomsListPage() {
  const { rooms, getRooms, isLoading } = useRoomsStore((state) => state);

  const { onOpenCreateModal, onOpenEditModal, onOpenDeleteModal } = useModalAction();

  const hasRooms = size(rooms) > 0;

  useEffect(() => {
    getRooms();
  }, []);

  if (isLoading && rooms?.length === 0) return <Spinner />;

  return (
    <>
      <Header onCreateRoom={onOpenCreateModal} />

      <div className={clsx("grid", { "gap-4 md:grid-cols-2 lg:grid-cols-3": hasRooms })}>
        {hasRooms ? (
          rooms.map((it) => (
            <RoomsCard
              key={`room_${it?.id}`}
              {...it}
              onEditRoom={onOpenEditModal}
              onDeleteRoom={onOpenDeleteModal}
            />
          ))
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
