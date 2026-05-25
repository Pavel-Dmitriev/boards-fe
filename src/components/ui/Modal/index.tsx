import { RiCloseLine } from "@remixicon/react";
import clsx from "clsx";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { Content } from "./Content";
import { useModalStore } from "./store";

import type { IModalProps } from "./interface";

/**
 * Модальное окно, которое отображается поверх всего контента. Управляется через глобальный стейт `useModalStore`.
 */
export function Modal({ className }: IModalProps) {
  const { isOpen, config, close } = useModalStore();

  const contentProps = {
    children: config?.children,
    buttons: config?.buttons,
    className,
    onClose: config?.onClose,
  };

  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-100 flex items-center justify-center transition-all duration-200",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 bg-black/60 transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={close}
      />
      <div
        className={clsx(
          "border-border relative mx-4 w-full max-w-lg rounded-xl border bg-white p-6 shadow-2xl transition-all duration-200 dark:bg-[#120d2a]",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
      >
        {/* Заголовок и кнопка закрытия */}
        {config?.title && (
          <header
            className={clsx(
              "grid shrink-0 grid-cols-[1fr_min-content] items-center pb-5 md:pb-8",
              className?.header,
            )}
          >
            <h2 className="font-semibold">{config.title}</h2>

            <form method="dialog" onSubmit={close} className="flex">
              <button type="submit" className="group cursor-pointer transition-colors">
                <RiCloseLine className="size-6 text-slate-400 group-hover:text-purple-400" />
              </button>
            </form>
          </header>
        )}
        {config?.wrapper ? (
          config.wrapper(<Content {...contentProps} />)
        ) : (
          <Content {...contentProps} />
        )}
      </div>
    </div>,
    document.body,
  );
}
export { useModal } from "./useModal";
