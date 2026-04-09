import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Тип кнопки */
  kind?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  /** Размер */
  size?: "sm" | "md" | "lg";
  /** Загрузка */
  isLoading?: boolean;
  /** Иконка слева */
  leftIcon?: ReactNode;
  /** Иконка справа */
  rightIcon?: ReactNode;
}
