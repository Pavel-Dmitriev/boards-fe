import type { HTMLAttributes } from "react";

import type { SizeType } from "shared/types/SizeType";

export default interface ISpinner extends HTMLAttributes<HTMLSpanElement> {
  size?: SizeType;
}
