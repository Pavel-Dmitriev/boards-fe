import type { IRoom } from "shared/interfaces";

/** Пропсы карточки комнаты */
export interface IRoomsCardProps extends IRoom {
  /** Открыть модалку редактирования */
  onEditRoom: (room: Pick<IRoom, "id" | "name" | "description">) => void;
  /** Открыть модалку удаления */
  onDeleteRoom: (id: string) => void;
  /** Вступить в комнату */
  onJoinRoom: (id: string) => void;
}
