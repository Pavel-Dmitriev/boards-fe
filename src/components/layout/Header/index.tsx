import { RiLogoutBoxLine, RiMoonLine, RiSunLine, RiUserLine } from "@remixicon/react";
import clsx from "clsx";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { MENU } from "./menu";
import { Button, Spinner } from "components/ui";
import { useUsersStore } from "shared/stores";
import { useAuthStore } from "shared/stores/auth";
import { useThemeStore } from "shared/stores/theme";

import ligaBoard from "assets/liga-board.avif";

import { useIsDark } from "shared/hooks";

export function Header() {
  const { isAuthenticated, logout, isLoading: isLoadingUser } = useAuthStore();
  const { profile, isLoading: isLoadingProfile } = useUsersStore();
  const { toggleTheme } = useThemeStore();
  const isDark = useIsDark();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menu = !isAuthenticated ? Array(MENU[0]) : MENU;

  return (
    <header className="header">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/rooms"
          className="hover:text-accent dark:hover:text-accent-light flex items-center gap-2"
        >
          <img src={ligaBoard} alt="Доска" className="max-w-10" loading="lazy" />
          <span className="text-lg font-medium">Liga Board</span>
        </Link>

        <nav className="flex items-center gap-6">
          {isLoadingUser || isLoadingProfile ? (
            <Spinner size="sm" />
          ) : (
            <>
              {menu.map((it) => (
                <NavLink
                  key={it.key}
                  to={it.path}
                  className={({ isActive }) =>
                    clsx(
                      "text-sm transition-colors",
                      isActive ? "text-purple-500 dark:text-purple-400" : "text-primary",
                    )
                  }
                >
                  {it.title}
                </NavLink>
              ))}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-neutral/70! flex items-center gap-1 text-sm transition-colors hover:text-white"
                  >
                    <RiUserLine className="h-4 w-4" />
                    {profile?.name}
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
                    className="text-primary text-sm transition-colors hover:text-purple-500 dark:hover:text-purple-400"
                  >
                    Войти
                  </Link>
                  <Link to="/register" className="btn btn-primary px-4 py-2 text-sm">
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
