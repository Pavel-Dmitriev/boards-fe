import type { LabelHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Пропсы для label, включая текст и необязательные элементы */
  label: LabelHTMLAttributes<HTMLLabelElement> & {
    /** Обязательное поле */
    required?: boolean;
    /** Дополнительный элемент, который будет отображаться рядом с label */
    additionalElement?: ReactNode;
    /** Нужно ли оборачивать label в блок */
    hasWrapper?: boolean;
  };
  /** Класс для стилизации блока с textarea */
  className?: string;
  /** Класс для стилизации блока ошибок */
  errorClassName?: string;
}
