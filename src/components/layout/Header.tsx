import { RiLogoutBoxLine, RiMoonLine, RiSunLine, RiUserLine } from "@remixicon/react";
import { Link, useNavigate } from "react-router-dom";

import { Button, Spinner } from "components/ui";
import { useAuthStore } from "shared/stores/auth";
import { useThemeStore } from "shared/stores/theme";

import ligaBoard from "assets/liga-board.avif";

import { useIsDark } from "shared/hooks";

export function Header() {
  const { isAuthenticated, user, logout, isLoading } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  const isDark = useIsDark();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={ligaBoard} alt="Доска" className="max-w-10" loading="lazy" />
          <span className="text-lg font-medium">Liga Board</span>
        </Link>

        <nav className="flex items-center gap-6">
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <>
              <Link
                to="/"
                className="text-neutral/70 text-sm transition-colors dark:hover:text-white"
              >
                Доски
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/create-card"
                    className="text-neutral/70 text-sm transition-colors hover:text-white"
                  >
                    Создать карточку
                  </Link>
                  <Link
                    to="/profile"
                    className="text-neutral/70! flex items-center gap-1 text-sm transition-colors hover:text-white"
                  >
                    <RiUserLine className="h-4 w-4" />
                    {user?.name ?? "Say my name"}
                  </Link>
                  <Button
                    onClick={handleLogout}
                    size="sm"
                    kind="outline"
                    className="text-neutral/70"
                    leftIcon={<RiLogoutBoxLine className="h-4 w-4" />}
                  >
                    Выход
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-neutral/70 text-sm transition-colors hover:text-white"
                  >
                    Войти
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary hover:text-primary! px-4 py-2 text-sm"
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </>
          )}

          <button
            onClick={toggleTheme}
            className="text-neutral/70 hover:bg-bg-card-hover hover:text-neutral cursor-pointer rounded-lg p-2 transition-colors"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? <RiSunLine className="h-4 w-4" /> : <RiMoonLine className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
