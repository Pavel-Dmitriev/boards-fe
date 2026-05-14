import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { Frame } from "components/layout/Frame";

import {
  BoardCreatePage,
  BoardDetailPage,
  BoardListPage,
  CardDetailPage,
  CreateCardPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from "./pages";
import { ProtectedRoute } from "components/ProtectedRoute";

const NoAccess = lazy(() => import("./pages/NoAccess"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

export const router = createBrowserRouter([
  {
    element: <Frame />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <BoardListPage />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/board/:id",
        element: (
          <ProtectedRoute>
            <BoardDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/board/create",
        element: (
          <ProtectedRoute>
            <BoardCreatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/board/update",
        element: (
          <ProtectedRoute>
            <BoardCreatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rooms/:id",
        element: (
          <ProtectedRoute>
            <div>Rooms</div>
          </ProtectedRoute>
        ),
      },
      {
        path: "/rooms/create",
        element: (
          <ProtectedRoute>
            <div>Rooms</div>
          </ProtectedRoute>
        ),
      },
      {
        path: "/rooms/update",
        element: (
          <ProtectedRoute>
            <div>Rooms</div>
          </ProtectedRoute>
        ),
      },
      {
        path: "/card/:id",
        element: (
          <ProtectedRoute>
            <CardDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/card/create",
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
