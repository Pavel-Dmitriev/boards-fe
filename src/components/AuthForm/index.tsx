import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { Button } from "components/ui";
import { useUsersStore } from "shared/stores";
import { useAuthStore } from "shared/stores/auth";

import { AuthPath } from "./enum";

import type { IFormData } from "./interface";

function AuthForm() {
  const { register, handleSubmit } = useForm<IFormData>();
  const location = useLocation();
  const { login, register: registerUser } = useAuthStore();
  const getProfile = useUsersStore((state) => state.getProfile);

  const isRegisterPage = location.pathname.slice(1) === AuthPath.Register;

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    if (isRegisterPage) {
      await registerUser(data.name ?? "", data.email, data.password);
    } else {
      await login(data.email, data.password);
    }
    await getProfile();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {isRegisterPage && (
        <div>
          <label htmlFor="name" className="text-neutral/70 mb-2 block text-sm">
            Имя
          </label>
          <input
            id="name"
            type="text"
            className="input-glass w-full"
            {...register("name", { required: true })}
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
          {...register("email", { required: true })}
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
          {...register("password", { required: true })}
        />
      </div>

      <Button type="submit" className="mt-2 w-full">
        {isRegisterPage ? "Зарегистрироваться" : "Войти"}
      </Button>
    </form>
  );
}

export default AuthForm;
