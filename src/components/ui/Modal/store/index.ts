import { create } from "zustand";

import type { IModalState } from "./interface";

export const useModalStore = create<IModalState>((set) => ({
  isOpen: false,
  config: null,
  open: (config) => set({ isOpen: true, config }),
  close: () =>
    set((state) => {
      state.config?.onClose?.();
      return { isOpen: false };
    }),
}));
