import type { CardStatusType } from "shared/types/CardStatusType";

import type { ICard } from "shared/interfaces";

export interface ICardModalFormValues {
  title: string;
  description: string;
  status: CardStatusType;
}

export interface ICardModalProps {
  card: ICard;
}

export interface IFormData {
  comment: string;
}
