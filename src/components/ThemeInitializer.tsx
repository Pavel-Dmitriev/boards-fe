import { type ReactNode, useEffect } from "react";

import { useThemeStore } from "shared/stores/theme";

export function ThemeInitializer({ children }: { children: ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    // Удаляем оба класса на всякий случай
    root.classList.remove("light", "dark");
    // Добавляем текущий
    root.classList.add(theme);
  }, [theme]);

  return children;
}
