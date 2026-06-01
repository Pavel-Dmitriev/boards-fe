import type { ReactNode } from "react";

/** Данные формы создания/редактирования комнаты */
export interface IFormData {
  /** Название комнаты */
  name: string;
  /** Описание комнаты */
  description: string;
}

export interface IConfigFormModal {
  title: string;
  children: ReactNode;
  formId: string;
  submitText: string;
}
