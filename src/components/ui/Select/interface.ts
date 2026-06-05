import type { LabelHTMLAttributes } from "react";
import type { FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

import type { ILabelProps } from "../Label/interface";

export interface ISelectProps<TFieldValues extends FieldValues = FieldValues> {
  /** Название поля в форме */
  name: FieldPath<TFieldValues>;
  /** Правила валидации */
  rules?: Exclude<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
  /** Пропсы для label */
  label?: Omit<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor"> &
    Pick<ILabelProps, "children" | "required" | "additionalElement" | "hasWrapper">;
  /** Класс для стилизации обёртки */
  className?: string;
  /** Класс для стилизации блока ошибок */
  errorClassName?: string;
}
