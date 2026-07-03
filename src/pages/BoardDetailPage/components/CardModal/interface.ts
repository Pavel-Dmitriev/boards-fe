import type { ICard } from "shared/interfaces";
import type { CardStatusType } from "shared/types/CardStatusType";

export interface ICardModalFormValues {
  title: string;
  description: string;
  status: CardStatusType;
}

export interface ICardModalProps {
  card: ICard;
}
