import type { ReactNode } from "react";
import type { DefaultValues, Path } from "react-hook-form";

interface IFormFieldConfig<T extends Record<string, string>> {
  /** Название поля */
  name: Path<T>;
  /** Подпись первого поля */
  label: string;
  /** Подсказка для первого поля */
  placeholder: string;
}

export interface IFormLayoutProps<T extends Record<string, string>> {
  /** Идентификатор формы */
  formId: string;
  /** Значения по умолчанию для формы */
  defaultValues: DefaultValues<T> | undefined;
  /** Метод, вызываемый при отправке формы */
  onSubmit: (data: T) => void | Promise<void>;
  /** Метод, вызываемый при закрытии формы */
  onClose: () => void;
  /** Конфигурация для поля названия */
  nameField: IFormFieldConfig<T>;
  /** Конфигурация для поля описания */
  descriptionField?: Partial<IFormFieldConfig<T>>;
  /** Дополнительные элементы внутри формы */
  children?: ReactNode;
}
