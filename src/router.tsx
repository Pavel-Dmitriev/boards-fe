import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { Frame } from "components/layout/Frame";

import {
  BoardsPage,
  CardsPage,
  CreateCardPage,
  LoginPage,
  MyCardsPage,
  ProfilePage,
  RegisterPage,
  RoomsPage,
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
      {
        path: "/rooms",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <RoomsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <BoardsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/boards/:boardId",
        element: (
          <ProtectedRoute>
            <CardsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cards",
        children: [
          {
            index: true,
            element: <MyCardsPage />,
          },
          {
            path: "create",
            element: (
              <ProtectedRoute>
                <CreateCardPage />
              </ProtectedRoute>
            ),
          },
        ],
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
