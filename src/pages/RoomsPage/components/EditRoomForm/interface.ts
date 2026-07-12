import type { IRoom } from "shared/interfaces";

/** Пропсы формы редактирования комнаты */
export interface IEditRoomFormProps extends Pick<IRoom, "id" | "name" | "description"> {
  /** Закрыть модалку */
  onClose: () => void;
}
