import type { HTMLInputTypeAttribute, ReactNode } from "react";

export interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Тип поля ввода */
  type?: HTMLInputTypeAttribute;
  /** Имя поля */
  fieldName?: string;
  /** Текст для label */
  text: ReactNode;
  /* Нужно ли оборачивать label в блок */
  hasWrapper?: boolean;
  /** id для связи с input */
  inputId: string;
  /** Обязательное поле */
  required?: boolean;
  /** Класс для стилизации блока обертки над children */
  childrenWrapperClassName?: string;
  /** Дополнительный элемент внутри блока с input */
  additionalElement?: ReactNode;
  /** Кастомная ошибка */
  customError?: string;
  /** Класс для стилизации блока ошибок */
  errorClassName?: string;
}
