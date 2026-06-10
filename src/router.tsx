import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import { Frame } from "components/layout/Frame";

import {
  CreateCardPage,
  LoginPage,
  MyCardsPage,
  ProfilePage,
  RegisterPage,
  RoomsDetailPage,
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
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <RoomsListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <RoomsDetailPage />
              </ProtectedRoute>
            ),
          },
        ],
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
