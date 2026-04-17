import { RiAccountBox2Line } from "@remixicon/react";
import { Link } from "react-router-dom";

import { Button } from "components/ui/Button";

export function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <div className="blob blob-purple -top-32 left-1/4 h-96 w-96" />
      <div className="blob blob-blue right-1/4 -bottom-32 h-96 w-96" />
      <div className="blob blob-pink top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2" />

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

          <div>
            <Button type="submit" className="btn-primary" size="sm">
              Первый
            </Button>
            <Button type="submit" className="btn-primary" size="md">
              Второй
            </Button>
            <Button type="submit" className="btn-primary" size="lg">
              Третий
            </Button>
          </div>

          <div className="grid gap-y-3">
            <Button type="submit" className="btn-primary" leftIcon={<RiAccountBox2Line />}>
              primary
            </Button>

            <Button type="submit" className="btn-secondary" rightIcon={<RiAccountBox2Line />}>
              secondary
            </Button>
            <Button type="submit" className="btn-outline">
              outline
            </Button>
            <Button type="submit" className="btn-ghost">
              ghost
            </Button>
            <Button type="submit" className="btn-danger">
              danger
            </Button>
            <Button type="submit" className="btn-primary" isLoading>
              isLoading
            </Button>
            <Button type="submit" className="btn-primary" disabled>
              disabled
            </Button>
          </div>
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
