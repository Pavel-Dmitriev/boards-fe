import type { HTMLAttributes } from "react";

import type { SizeType } from "shared/types/SizeType";

export default interface ISpinner extends Omit<HTMLAttributes<HTMLSpanElement>, "className"> {
  className?: {
    wrapper?: string;
    spinner?: string;
  };
  size?: SizeType;
}
