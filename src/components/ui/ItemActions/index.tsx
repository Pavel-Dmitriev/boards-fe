import { RiDeleteBinLine, RiEditBoxLine } from "@remixicon/react";

import type { IItemActionsProps } from "./interface";

/** Кнопки редактирования и удаления */
export function ItemActions(props: IItemActionsProps) {
  const { onEdit, onDelete } = props ?? {};

  return (
    <div className="flex gap-x-3">
      <button
        title="Редактировать комнату"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.();
        }}
        className="shrink cursor-pointer self-start text-purple-400 transition-colors hover:text-purple-300"
      >
        <RiEditBoxLine className="size-5" />
      </button>
      <button
        title="Удалить комнату"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        className="shrink cursor-pointer self-start text-red-400 transition-colors hover:text-red-300"
      >
        <RiDeleteBinLine className="size-5" />
      </button>
    </div>
  );
}
