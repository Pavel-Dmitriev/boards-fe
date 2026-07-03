import type { ViewModeType } from "pages/BoardDetailPage/types";
import type { ICard } from "shared/interfaces";

export interface ICardProps {
  card: ICard;
  viewMode: ViewModeType;
  onOpenModal: (card: ICard) => void;
}
