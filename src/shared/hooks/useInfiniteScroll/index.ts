import { useEffect, useRef } from "react";

import type { IUseInfiniteScrollOptions, IUseInfiniteScrollReturn } from "./interface";

export function useInfiniteScroll(
  fetchMore: () => void,
  { isLoading, hasMore, hasViewport = false }: IUseInfiniteScrollOptions,
): IUseInfiniteScrollReturn {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const observerCallback = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && hasMore && !isLoading) {
      fetchMore();
    }
  };

  // Основной Observer – следит, когда sentinel попадает в область видимости
  useEffect(() => {
    const trigger = triggerRef.current;
    const root = hasViewport ? null : containerRef.current;
    if (!trigger) return;
    if (!hasViewport && !root) return;

    const observer = new IntersectionObserver(observerCallback, {
      root,
      threshold: 0,
    });
    observer.observe(trigger);
    return () => observer.disconnect();
  }, [observerCallback, hasViewport]);

  // Дозагрузка, если после обновления sentinel всё ещё видим (экран не заполнен)
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || !hasMore || isLoading) return;

    const root = hasViewport ? null : containerRef.current;
    const checkObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMore();
        }
        checkObserver.disconnect();
      },
      { root, threshold: 0 },
    );

    checkObserver.observe(trigger);

    return () => checkObserver.disconnect();
  }, [isLoading, hasMore, hasViewport]);

  return { triggerRef, containerRef };
}
