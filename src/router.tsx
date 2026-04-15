import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { Frame } from "components/layout/Frame";

import { ProtectedRoute } from "components/ProtectedRoute";
import { BoardDetailPage } from "pages/BoardDetailPage";
import { BoardsListPage } from "pages/BoardsListPage";
import { CardDetailPage } from "pages/CardDetailPage";
import { CreateCardPage } from "pages/CreateCardPage";
import { LoginPage } from "pages/LoginPage";
import { ProfilePage } from "pages/ProfilePage";
import { RegisterPage } from "pages/RegisterPage";

const NoAccess = lazy(() => import("./pages/NoAccess"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

export const router = createBrowserRouter([
  {
    element: <Frame />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <BoardsListPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/board/:id", element: <BoardDetailPage /> },
      { path: "/card/:id", element: <CardDetailPage /> },
      {
        path: "/create-card",
        element: (
          <ProtectedRoute>
            <CreateCardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      { path: "no-access", element: <NoAccess /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
