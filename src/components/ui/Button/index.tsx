import clsx from "clsx";
import { forwardRef } from "react";

import { twMerge } from "tailwind-merge";

import type { ButtonProps } from "./interface";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className,
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
            {
              "px-3 py-1.5 text-sm": size === "sm",
              "px-4 py-2 text-base": size === "md",
              "px-6 py-3 text-lg": size === "lg",
              "btn-loading": isLoading,
              "btn-disabled": disabled,
            },
            className,
          ),
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
