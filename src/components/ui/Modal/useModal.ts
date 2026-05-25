import { useCallback, useRef } from "react";

import { useModalStore } from "./store";

import type { IModalConfig } from "./store/interface";

/**
 * Хук для управления модалкой.
 * Принимает конфиг и возвращает open/close.
 */
export function useModal(config: IModalConfig) {
  const configRef = useRef(config);
  configRef.current = config;

  const open = useCallback(() => {
    useModalStore.getState().open(configRef.current);
  }, []);

  const close = useCallback(() => {
    useModalStore.getState().close();
  }, []);

  return { open, close };
}
