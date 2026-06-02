import type { IBoard } from "shared/interfaces";

export interface IBoardProps extends IBoard {
  /** Редактировать доску */
  onEditBoard?: () => void;
  /** Удалить доску */
  onDeleteBoard?: () => void;
  /** Лайкнуть карточку */
  onLikeCard?: (cardId: string) => void;
}
