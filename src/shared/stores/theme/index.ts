import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IThemeState } from "./interface";

export const useThemeStore = create<IThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme",
    },
  ),
);
