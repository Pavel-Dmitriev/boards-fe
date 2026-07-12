import type { ReactNode } from "react";

export interface IConfigFormModal {
  title: string;
  children: ReactNode;
  formId: string;
  submitText: string;
}
