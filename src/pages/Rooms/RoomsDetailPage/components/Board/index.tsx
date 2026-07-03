import { ItemActions } from "components/ui";

import type { IBoardProps } from "./interface";

export default function Board(props: IBoardProps) {
  const { name, description, owner, onEditBoard, onDeleteBoard, onGoBoard } = props ?? {};

  return (
    <article
      className="card flex cursor-pointer flex-col transition-shadow hover:shadow-lg"
      onClick={onGoBoard}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onGoBoard?.();
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">{name}</h2>
        <div onClick={(e) => e.stopPropagation()}>
          <ItemActions onEdit={onEditBoard} onDelete={onDeleteBoard} />
        </div>
      </div>
      <p className="text-neutral/70 mb-4 flex-1 text-sm">{description}</p>
      {owner?.name && (
        <span className="text-neutral/70 mt-auto text-end text-xs">{owner.name}</span>
      )}
    </article>
  );
}
