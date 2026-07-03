import { RiLayout2Line, RiListCheck } from "@remixicon/react";
import clsx from "clsx";

import { VIEW_MODE } from "pages/BoardDetailPage/constants";

import type { IViewTogglerProps } from "./interface";

export default function ViewToggler({ viewMode, onChange, className }: IViewTogglerProps) {
  return (
    <div
      className={clsx(
        "flex overflow-hidden rounded-lg border border-gray-200 dark:border-white/10",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(VIEW_MODE.LIST)}
        className={clsx(
          "flex cursor-pointer items-center gap-1 px-3 py-1.5 text-xs transition-colors",
          {
            "bg-purple-500 text-white": viewMode === VIEW_MODE.LIST,
            "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10": viewMode !== VIEW_MODE.LIST,
          },
        )}
      >
        <RiListCheck className="size-3.5" />
        <span className="hidden sm:inline">Список</span>
      </button>
      <button
        type="button"
        onClick={() => onChange(VIEW_MODE.GRID)}
        className={clsx(
          "flex cursor-pointer items-center gap-1 px-3 py-1.5 text-xs transition-colors",
          {
            "bg-purple-500 text-white": viewMode === VIEW_MODE.GRID,
            "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10": viewMode !== VIEW_MODE.GRID,
          },
        )}
      >
        <RiLayout2Line className="size-3.5" />
        <span className="hidden sm:inline">Сетка</span>
      </button>
    </div>
  );
}
