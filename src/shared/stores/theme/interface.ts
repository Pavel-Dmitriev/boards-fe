import type { ThemeType } from "shared/types/ThemeType";

export interface IThemeState {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}
