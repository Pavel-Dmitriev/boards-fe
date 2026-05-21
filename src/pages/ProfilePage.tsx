import dayjs from "dayjs";

import { Spinner, TextField } from "components/ui";
import { useUsersStore } from "shared/stores";

export function ProfilePage() {
  const { profile, isLoading } = useUsersStore((state) => state);
  const { name, email, createdAt } = profile ?? {};

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1 className="text-primary mb-6 text-3xl font-semibold">Профиль</h1>
      <div className="grid justify-start gap-y-3">
        <TextField label="Дата регистрации" value={dayjs(createdAt).format("DD-MM-YYYY")} />
        <TextField label="Имя" value={name} />
        <TextField label="Почта" value={email} />
      </div>
    </div>
  );
}
