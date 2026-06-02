import clsx from "clsx";

import { twMerge } from "tailwind-merge";

import binokl from "assets/binokl.avif";

import type { INoDataProps } from "./interface";

/** Компонент показывает сообщение об отсутствии данных */
export function NoData({ className, size = "xl" }: INoDataProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "mt-20 grid grid-rows-[repeat(2,minmax(0,min-content))] place-content-center justify-items-center",
          className,
        ),
      )}
    >
      <img
        src={binokl}
        alt="бинокль"
        className={clsx({
          "size-30": size === "xl",
          "size-15": size === "md",
          "size-5": size === "xs",
        })}
      />
      <p
        className={clsx("text-gray-400", {
          "text-xl": size === "xl",
          "text-md": size === "md",
          "text-xs": size === "xs",
        })}
      >
        Нет данных
      </p>
    </div>
  );
}
