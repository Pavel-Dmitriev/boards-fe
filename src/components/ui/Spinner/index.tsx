import clsx from "clsx";

import { twMerge } from "tailwind-merge";

import type ISpinner from "./interface";

export function Spinner({ className, size = "xl" }: ISpinner) {
  return (
    <div className={twMerge(clsx("flex h-screen items-center justify-center", className?.wrapper))}>
      <div
        className={twMerge(
          clsx(
            "border-accent animate-spin rounded-full border-4 border-t-transparent",
            className?.spinner,
            {
              "size-4": size === "xs",
              "size-5": size === "sm",
              "size-6": size === "md",
              "size-7": size === "lg",
              "size-8": size === "xl",
            },
          ),
        )}
      />
    </div>
  );
}
