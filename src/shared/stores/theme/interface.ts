import type { ThemeType } from "shared/types/theme";

export interface IThemeState {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}
