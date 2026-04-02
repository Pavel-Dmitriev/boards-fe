import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  initialize: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: true,
  toggle: () => set((state) => ({ isDark: !state.isDark })),
  initialize: () => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      set({ isDark: saved === "dark" });
    }
  },
}));
