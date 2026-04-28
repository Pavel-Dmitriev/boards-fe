import { StrictMode, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { useAuthStore } from "shared/stores/auth";

export function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
