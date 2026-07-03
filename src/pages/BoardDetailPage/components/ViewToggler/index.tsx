import { RiLayout2Line, RiListCheck } from "@remixicon/react";
import clsx from "clsx";

import type { IViewTogglerProps } from "./interface";

export default function ViewToggler({ viewMode, onChange }: IViewTogglerProps) {
  return (
    <div className="flex overflow-hidden rounded-lg border border-gray-200 dark:border-white/10">
      <button
        type="button"
        onClick={() => onChange("list")}
        className={clsx(
          "flex cursor-pointer items-center gap-1 px-3 py-1.5 text-xs transition-colors",
          {
            "bg-purple-500 text-white": viewMode === "list",
            "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10": viewMode !== "list",
          },
        )}
      >
        <RiListCheck className="size-3.5" />
        <span className="hidden sm:inline">Список</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={clsx(
          "flex cursor-pointer items-center gap-1 px-3 py-1.5 text-xs transition-colors",
          {
            "bg-purple-500 text-white": viewMode === "grid",
            "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10": viewMode !== "grid",
          },
        )}
      >
        <RiLayout2Line className="size-3.5" />
        <span className="hidden sm:inline">Сетка</span>
      </button>
    </div>
  );
}
