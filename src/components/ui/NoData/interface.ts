import type { SizeType } from "shared/types/SizeType";

export interface INoDataProps {
  className?: string;
  size?: Extract<SizeType, "xl" | "md" | "xs">;
}
