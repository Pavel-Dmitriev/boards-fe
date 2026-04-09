import clsx from "clsx";
import { forwardRef } from "react";

import { twMerge } from "tailwind-merge";

import { KIND_CLASSES, SIZE_CLASSES } from "./constants";

import type { ButtonProps } from "./interface";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className,
      kind = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={twMerge(
          clsx(
            "btn",
            KIND_CLASSES[kind],
            SIZE_CLASSES[size],
            isLoading && "btn-loading",
            disabled && "btn-disabled",
          ),
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <span className="btn-spinner" />}
        {!isLoading && leftIcon && <span className="btn-icon btn-icon-left">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="btn-icon btn-icon-right">{rightIcon}</span>}
      </button>
    );
  },
);
