import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

export interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /* Пропсы для label, включая текст и необязательные элементы */
  label: LabelHTMLAttributes<HTMLLabelElement> & {
    /* Обязательное поле */
    required?: boolean;
    /* Дополнительный элемент, который будет отображаться рядом с label */
    additionalElement?: ReactNode;
    /* Нужно ли оборачивать label в блок */
    hasWrapper?: boolean;
  };
  /* Класс для стилизации блока с input */
  className?: string;
  /** Класс для стилизации блока ошибок */
  errorClassName?: string;
}
