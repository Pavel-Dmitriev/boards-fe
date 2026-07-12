import type { ReactNode } from "react";

/** Конфиг модалки, передаваемый через useModal */
export interface IModalConfig {
  /** Размер модалки */
  size?: "lg" | "3xl";
  /** Заголовок модалки */
  title?: ReactNode;
  /** Основной контент */
  children: ReactNode;
  /** Кнопки в футере */
  buttons?: ReactNode;
  /** Оборачивает children + buttons в общий контекст (например, FormProvider)
   * @example
   * wrapper: (content) => <FormProvider>{content}</FormProvider>
   */
  wrapper?: (content: ReactNode) => ReactNode;
  /** Кастомные классы для элементов модалки */
  className?: {
    header?: string;
    content?: string;
    buttons?: string;
  };
  /** Колбэк при закрытии модалки */
  onClose?: () => void;
}

/** Состояние стора модалки */
export interface IModalState {
  /** Открыта ли модалка */
  isOpen: boolean;
  /** Текущий конфиг */
  config: IModalConfig | null;
  /** Открыть модалку с переданным конфигом */
  open: (config: IModalConfig) => void;
  /** Закрыть модалку */
  close: () => void;
}
