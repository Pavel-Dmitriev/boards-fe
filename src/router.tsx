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
      { path: "/", element: <BoardListPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/board/:id", element: <BoardDetailPage /> },
      { path: "/board/create", element: <BoardCreatePage /> },
      { path: "/board/update", element: <BoardCreatePage /> },
      { path: "/rooms/:id", element: <div>Rooms</div> },
      { path: "/rooms/create", element: <div>Rooms</div> },
      { path: "/rooms/update", element: <div>Rooms</div> },
      { path: "/card/:id", element: <CardDetailPage /> },
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
