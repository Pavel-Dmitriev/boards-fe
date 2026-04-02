import { StrictMode, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { useAuthStore } from "shared/stores/authStore";
import { useThemeStore } from "shared/stores/themeStore";

export function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);
  const initializeTheme = useThemeStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
    initializeTheme();
  }, [initializeAuth, initializeTheme]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
