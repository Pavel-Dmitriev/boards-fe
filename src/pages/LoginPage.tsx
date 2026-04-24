import { Link } from "react-router-dom";

import { BlobGradient, Button } from "components/ui";

export function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <BlobGradient />

      <div className="rounded-card border-border bg-bg-card relative z-10 w-full max-w-md border p-8 backdrop-blur-xl">
        <h1 className="mb-6 text-center text-2xl font-medium">Вход</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-neutral/70 mb-2 block text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="input-glass w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-neutral/70 mb-2 block text-sm">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="input-glass w-full"
            />
          </div>

          <Button type="submit" className="btn-primary w-full">
            Войти
          </Button>
        </form>

        <p className="text-neutral/70 mt-6 text-center text-sm">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-accent-light hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
