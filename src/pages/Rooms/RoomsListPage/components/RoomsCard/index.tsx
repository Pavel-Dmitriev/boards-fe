import { RiDoorOpenLine } from "@remixicon/react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

import { Button, ItemActions } from "components/ui";
import { useUsersStore } from "shared/stores";

import type { IRoomsCardProps } from "./interface";

/**
 * Карточка комнаты.
 * Отображает название, описание, дату создания, владельца и количество досок.
 * По клику на карточку — переход на страницу комнаты.
 * Иконки редактирования и удаления открывают соответствующие модалки.
 */
export default function RoomsCard(props: IRoomsCardProps) {
  const {
    id,
    name,
    createdAt,
    description,
    owner,
    boardsCount,
    onEditRoom,
    onDeleteRoom,
    onJoinRoom,
  } = props ?? {};

  const navigate = useNavigate();

  const profile = useUsersStore((state) => state.profile);

  const isRoomAuthor = owner?.id === profile?.id;

  return (
    <article
      className="card flex h-52 max-h-52 min-h-52 cursor-pointer flex-col items-stretch overflow-hidden"
      onClick={() => navigate(`${id}`)}
    >
      <div className="mb-2">
        <div className="flex gap-x-3">
          <h2 className="mb-1 grow text-xl font-medium">{name}</h2>
          <ItemActions
            onEdit={() => onEditRoom({ id, name, description })}
            onDelete={() => onDeleteRoom(id)}
          />
        </div>
        <div className="flex items-center gap-x-2 text-xs">
          <span className="text-neutral/70 align-top">
            {dayjs(createdAt).format("DD.MM.YYYY, HH:MM")}
          </span>
          <span className="inline-block size-1 rounded-full bg-purple-700" />
          <span>{owner?.name}</span>
        </div>
      </div>
      <div className="h-full">
        <p className="text-neutral/70 mb-4 line-clamp-3 text-sm">{description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="badge self-start text-xs">{boardsCount ?? 0} активных досок</span>
        {!isRoomAuthor && (
          <Button
            size="sm"
            kind="outline"
            leftIcon={<RiDoorOpenLine className="size-3.5" />}
            onClick={(e) => {
              e.stopPropagation();
              onJoinRoom(id);
            }}
          >
            Вступить
          </Button>
        )}
      </div>
    </article>
  );
}
