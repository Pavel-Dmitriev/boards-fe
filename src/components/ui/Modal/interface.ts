import type { ReactNode } from "react";

export interface IContentProps {
  /** Контент */
  content: ReactNode;
  /** Кнопки */
  buttons: ReactNode;
  /** Кастомные классы */
  className?: { content?: string; buttons?: string };
  /** Колбэк при закрытии модалки */
  onClose?: () => void;
}
