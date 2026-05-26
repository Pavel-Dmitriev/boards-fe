import type { ReactNode } from "react";

export interface IModalProps {
  /** Кастомные классы для элементов модалки */
  className?: {
    /* Класс для хедера */
    header?: string;
    /* Класс для основного контента */
    content?: string;
    /* Класс для футера с кнопками */
    buttons?: string;
  };
}

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
