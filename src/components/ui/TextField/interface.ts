import type { ReactNode } from "react";

export interface ITextField {
  /** Подпись слева от двоеточия */
  label: string;
  /** Отображаемое значение */
  value?: ReactNode | ReactNode[];
  /** Текст-заглушка */
  baseValue?: string;
}
