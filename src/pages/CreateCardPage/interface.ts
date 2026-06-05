import type { SelectOptionType } from "shared/types/SelectOptionType";

export interface IFormData {
  /** Заголовок */
  title: string;
  /** Описание */
  description: string;
  /** Объект с данными по комнате */
  room: SelectOptionType | null;
  /** Объект с данными по доске */
  board: SelectOptionType | null;
}
