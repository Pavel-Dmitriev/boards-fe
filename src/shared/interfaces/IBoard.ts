/** Интерфейс доски */
export interface IBoard {
  /** Идентификатор */
  id: string;
  /** Название доски */
  title: string;
  /** Описание доски */
  description: string;
  /** Создатель доски */
  created_by: string;
  /** Дата создания доски */
  created_at: string;
}
