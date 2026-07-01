import type { RefObject } from "react";

/** Опции хука бесконечного скролла */
export interface IUseInfiniteScrollOptions {
  /** Флаг загрузки */
  isLoading: boolean;
  /** Есть ли ещё данные для подгрузки */
  hasMore: boolean;
  /** Если true — root = viewport (скролл страницы), иначе — containerRef */
  hasViewport?: boolean;
}

/** Возвращаемые значения хука бесконечного скролла */
export interface IUseInfiniteScrollReturn {
  /** Ref на sentinel-элемент, за которым следит IntersectionObserver */
  triggerRef: RefObject<HTMLDivElement | null>;
  /** Ref на контейнер со скроллом (если hasViewport = false) */
  containerRef: RefObject<HTMLDivElement | null>;
}
