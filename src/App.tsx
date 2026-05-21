import { StrictMode, Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { router } from "./router";
import { Spinner } from "components/ui";
import { useUsersStore } from "shared/stores";
import { useAuthStore } from "shared/stores/auth";

export function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const getProfile = useUsersStore((state) => state.getProfile);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    checkAuth().then(() => {
      if (useAuthStore.getState().isAuthenticated) {
        getProfile();
      }
    });
  }, [checkAuth]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <StrictMode>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster />
    </StrictMode>
  );
}
