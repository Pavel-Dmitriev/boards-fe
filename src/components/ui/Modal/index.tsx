import { RiCloseLine } from "@remixicon/react";
import clsx from "clsx";
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import { Content } from "./Content";
import { useModalStore } from "./store";

/**
 * Модальное окно, которое отображается поверх всего контента. Управляется через глобальный стейт `useModalStore`.
 */
export function Modal() {
  const { isOpen, config, close } = useModalStore();

  const className = config?.className;

  const contentProps = {
    content: config?.children,
    buttons: config?.buttons,
    className,
    onClose: config?.onClose,
  };

  const size = config?.size || "lg";
  const title =
    typeof config?.title === "string" ? (
      <h2 className="font-semibold">{config.title}</h2>
    ) : (
      (config?.title as ReactNode)
    );

  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  const portalNode = document.getElementById("modal");

  if (!portalNode) return null;

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-100 flex items-center justify-center transition-all duration-200",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        className={clsx("absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-200", {
          "opacity-100": isOpen,
        })}
        onClick={close}
      />
      <div
        className={clsx(
          "border-border relative mx-4 w-full scale-95 rounded-xl border bg-white p-6 opacity-0 shadow-2xl transition-all duration-200 dark:bg-[#120d2a]",
          {
            "scale-100 opacity-100": isOpen,
            "max-w-lg": size === "lg",
            "max-w-3xl": size === "3xl",
          },
        )}
      >
        {/* Заголовок и кнопка закрытия */}
        {config?.title && (
          <header
            className={clsx(
              "grid shrink-0 grid-cols-[1fr_min-content] items-center pb-5",
              className?.header,
            )}
          >
            {title}

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
    portalNode,
  );
}
