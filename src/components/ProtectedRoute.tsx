import { type ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "shared/stores/auth";

interface IProtectedRoute {
  children: ReactNode;
}

export function ProtectedRoute({ children }: IProtectedRoute) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    if (isAuthPage && isAuthenticated) {
      navigate("/rooms");
      return;
    }

    if (!isAuthPage && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
