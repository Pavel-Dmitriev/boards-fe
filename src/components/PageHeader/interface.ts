export interface IHeaderProps {
  /** Заголовок */
  title: string;
  /** Описание */
  description: string;
  /** Заголовок кнопки */
  titleBtn: string;
  /** Открыть модалку создания сущности */
  onCreate: () => void;
}
