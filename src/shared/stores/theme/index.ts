import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IThemeState } from "./interface";
import { ThemeType } from "shared/types/ThemeType";

export const useThemeStore = create<IThemeState>()(
  persist(
    (set) => ({
      theme: ThemeType.Dark,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === ThemeType.Dark ? ThemeType.Light : ThemeType.Dark,
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme",
    },
  ),
);
