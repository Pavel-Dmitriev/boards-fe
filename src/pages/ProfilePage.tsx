import dayjs from "dayjs";
import size from "lodash-es/size";
import { useEffect } from "react";

import { Spinner, TextField } from "components/ui";
import { useUsersStore } from "shared/stores";

export function ProfilePage() {
  const { profile, isLoading, getProfile } = useUsersStore((state) => state);
  const { id, name, email, createdAt, rooms } = profile ?? {};

  const roomsElements =
    size(rooms) > 0
      ? rooms
          ?.filter((room) => room?.ownerId === id)
          ?.map((room, i, arr) => (
            <span key={room?.id} className="text-primary">
              {room?.name}
              {i !== arr.length - 1 ? ", " : ""}
            </span>
          ))
      : undefined;

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-primary mb-6 text-3xl font-semibold">Профиль</h1>
      <div className="grid justify-start gap-y-3">
        <TextField label="Дата регистрации" value={dayjs(createdAt).format("DD-MM-YYYY")} />
        <TextField label="Имя" value={name} />
        <TextField label="Почта" value={email} />
        <TextField label="Ваши комнаты" value={roomsElements} />
      </div>
    </div>
  );
}
