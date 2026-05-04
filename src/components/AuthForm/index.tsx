import { type SyntheticEvent, useState } from "react";

import { Button } from "components/ui";
import { useAuthStore } from "shared/stores/auth";

import { AuthKind } from "./enum";

import type { IAuthForm } from "./interface";

function AuthForm({ type = AuthKind.SignIn }: IAuthForm) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    return type === AuthKind.SignUp
      ? await register(name, email, password)
      : await login(email, password);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {type === AuthKind.SignUp && (
        <div>
          <label htmlFor="name" className="text-neutral/70 mb-2 block text-sm">
            Имя
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ваше имя"
            className="input-glass w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="text-neutral/70 mb-2 block text-sm">
          Почта
        </label>
        <input
          id="email"
          type="email"
          className="input-glass w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="text-neutral/70 mb-2 block text-sm">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          className="input-glass w-full"
          value={password}
          onChange={(e) => setPassword(e?.target?.value)}
        />
      </div>

      <Button type="submit" className="btn-primary mt-2 w-full">
        {type === AuthKind.SignUp ? "Зарегистрироваться" : "Войти"}
      </Button>
    </form>
  );
}

export default AuthForm;
