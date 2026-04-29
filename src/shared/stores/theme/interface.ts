import type { ThemeType } from "shared/types/ThemeType";

/** Интерфейс хранилища темы  */
export interface IThemeState {
  /** Тема */
  theme: ThemeType;
  /** Переключение темы */
  toggleTheme: () => void;
  /** Установка темы */
  setTheme: (theme: ThemeType) => void;
}
