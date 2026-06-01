import { RiDeleteBinLine, RiEditBoxLine } from "@remixicon/react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

import type { IRoomsCardProps } from "./interface";

/**
 * Карточка комнаты.
 * Отображает название, описание, дату создания, владельца и количество досок.
 * По клику на карточку — переход на страницу комнаты.
 * Иконки редактирования и удаления открывают соответствующие модалки.
 */
export default function RoomsCard(props: IRoomsCardProps) {
  const { id, name, createdAt, description, owner, boardsCount, onEditRoom, onDeleteRoom } =
    props ?? {};

  const navigate = useNavigate();

  return (
    <article
      className="card flex h-52 max-h-52 min-h-52 cursor-pointer flex-col items-stretch overflow-hidden"
      onClick={() => navigate(`${id}`)}
    >
      <div className="mb-2">
        <div className="flex gap-x-3">
          <h2 className="mb-1 grow text-xl font-medium">{name}</h2>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditRoom({ id, name, description });
            }}
            className="shrink cursor-pointer self-start text-purple-400 transition-colors hover:text-purple-300"
          >
            <RiEditBoxLine className="size-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteRoom(id);
            }}
            className="shrink cursor-pointer self-start text-red-400 transition-colors hover:text-red-300"
          >
            <RiDeleteBinLine className="size-5" />
          </button>
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
      <span className="badge mt-auto self-start text-xs">{boardsCount ?? 0} активных досок</span>
    </article>
  );
}
