import type { SizeType } from "shared/types/SizeType";

export interface INoDataProps {
  /** Текст сообщения */
  label?: string;
  /** Дополнительные классы */
  className?: string;
  /** Размер */
  size?: Extract<SizeType, "xl" | "md" | "xs">;
}
