import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { Frame } from "components/layout/Frame";

import {
  BoardCreatePage,
  BoardDetailPage,
  CardDetailPage,
  CreateCardPage,
  LoginPage,
  MyCardsPage,
  ProfilePage,
  RegisterPage,
  RoomsDetailPage,
  RoomsFormPage,
  RoomsListPage,
} from "./pages";
import { ProtectedRoute } from "components/ProtectedRoute";

const NoAccess = lazy(() => import("./pages/Service/NoAccess"));
const NotFound = lazy(() => import("./pages/Service/NotFound"));
const ErrorPage = lazy(() => import("./pages/Service/ErrorPage"));

export const router = createBrowserRouter([
  {
    element: <Frame />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/my-cards", element: <MyCardsPage /> },
      {
        path: "/rooms",
        element: <RoomsListPage />,
      },
      {
        path: "/rooms/:id",
        element: (
          <ProtectedRoute>
            <RoomsDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/rooms/create",
        element: (
          <ProtectedRoute>
            <RoomsFormPage />
          </ProtectedRoute>
        ),
      },

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
