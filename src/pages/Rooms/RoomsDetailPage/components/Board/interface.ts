import type { IBoard } from "shared/interfaces";

export interface IBoardProps extends IBoard {
  /** Редактировать доску */
  onEditBoard?: () => void;
  /** Удалить доску */
  onDeleteBoard?: () => void;
  /** Перейти на страницу карточек доски */
  onGoBoard?: () => void;
}
