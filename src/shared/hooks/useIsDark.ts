import { useThemeStore } from "shared/stores/theme";

import { ThemeType } from "shared/types/ThemeType";

/** Хук оповещает, что темная тема включена/выключена
 * @returns true/false
 */
export function useIsDark() {
  const theme = useThemeStore((state) => state.theme);

  return theme === ThemeType.Dark;
}
