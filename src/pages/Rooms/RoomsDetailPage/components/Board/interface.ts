import type { IBoard, ICard } from "shared/interfaces";

export interface IBoardProps extends IBoard {
  /** Карточки доски */
  cards: ICard[];
  /** Редактировать доску */
  onEditBoard?: () => void;
  /** Удалить доску */
  onDeleteBoard?: () => void;
  /** Создать карточку */
  onCreateCard?: () => void;
}
