import dayjs from "dayjs";

import { TextField } from "components/ui";

import type { IProfile } from "shared/interfaces";

/**
 * Контент модалки профиля: дата регистрации, имя и почта.
 *
 * @param profile — данные профиля пользователя
 */
export function ProfileContent({ profile }: { profile: IProfile | null }) {
  const { name, email, createdAt } = profile ?? {};

  return (
    <div className="grid justify-start gap-y-3">
      <TextField label="Дата регистрации" value={dayjs(createdAt).format("DD-MM-YYYY")} />
      <TextField label="Имя" value={name} />
      <TextField label="Почта" value={email} />
    </div>
  );
}
