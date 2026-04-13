import { RiLogoutBoxLine, RiMoonLine, RiSunLine, RiUserLine } from "@remixicon/react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "shared/stores/authStore";
import { useThemeStore } from "shared/stores/theme";

import ligaBoard from "assets/liga-board.png";

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header-glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={ligaBoard} alt="Доска" className="max-w-10" loading="lazy" />
          <span className="text-lg font-medium tracking-tight">Liga Board</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            Доски
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/create-card"
                className="text-text-secondary hover:text-text-primary text-sm transition-colors"
              >
                Создать карточку
              </Link>
              <Link
                to="/profile"
                className="text-text-secondary hover:text-text-primary flex items-center gap-1 text-sm transition-colors"
              >
                <RiUserLine className="h-4 w-4" />
                {user?.name}
              </Link>
              <button
                onClick={handleLogout}
                className="text-text-secondary hover:text-text-primary flex items-center gap-1 text-sm transition-colors"
              >
                <RiLogoutBoxLine className="h-4 w-4" />
                Выход
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-text-secondary hover:text-text-primary text-sm transition-colors"
              >
                Войти
              </Link>
              <Link to="/register" className="btn-gradient text-sm">
                Регистрация
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="text-text-secondary hover:bg-bg-card-hover hover:text-text-primary rounded-lg p-2 transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <RiSunLine className="h-4 w-4" />
            ) : (
              <RiMoonLine className="h-4 w-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
