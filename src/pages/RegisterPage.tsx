import { Link, Navigate } from "react-router-dom";

import AuthForm from "components/AuthForm";
import { BlobGradient } from "components/ui";
import { useAuthStore } from "shared/stores/auth";

export function RegisterPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/rooms" />;

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      <BlobGradient />

      <div className="rounded-card border-border bg-bg-card relative z-10 w-full max-w-md border p-8 backdrop-blur-xl">
        <h1 className="mb-6 text-center text-2xl font-medium">Регистрация</h1>

        <AuthForm />

        <p className="text-neutral/70 mt-6 text-center text-sm">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
