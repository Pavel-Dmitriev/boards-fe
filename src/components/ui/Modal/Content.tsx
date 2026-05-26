import clsx from "clsx";

import type { IContentProps } from "./interface";

export function Content({ content, buttons, className, onClose }: IContentProps) {
  return (
    <>
      {content && (
        <div className={clsx("max-h-[60vh] flex-1 overflow-y-auto", className?.content)}>
          {content}
        </div>
      )}
      {buttons && (
        <form
          method="dialog"
          className={clsx("mt-5 flex shrink-0 justify-end gap-2", className?.buttons)}
          onSubmit={onClose}
          onClick={(e) => {
            if ((e.target as HTMLButtonElement)?.type === "button") {
              onClose?.();
            }
          }}
        >
          {buttons}
        </form>
      )}
    </>
  );
}
