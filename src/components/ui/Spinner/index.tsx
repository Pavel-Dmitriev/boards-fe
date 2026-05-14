import clsx from "clsx";

import type ISpinner from "./interface";

export function Spinner({ className, size = "xl" }: ISpinner) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className={clsx(
          "border-accent animate-spin rounded-full border-4 border-t-transparent",
          className,
          {
            "size-4": size === "xs",
            "size-5": size === "sm",
            "size-6": size === "md",
            "size-7": size === "lg",
            "size-8": size === "xl",
          },
        )}
      />
    </div>
  );
}
