import { StrictMode, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { router } from "./router";
import { useAuthStore } from "shared/stores/auth";

export function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </StrictMode>
  );
}
