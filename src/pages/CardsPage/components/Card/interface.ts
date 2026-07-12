import type { ViewModeType } from "pages/CardsPage/types";
import type { ICard } from "shared/interfaces";

export interface ICardProps {
  card: ICard;
  viewMode: ViewModeType;
  onOpenModal: (card: ICard) => void;
}
