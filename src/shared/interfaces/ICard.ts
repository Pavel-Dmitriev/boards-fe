import type { CardStatusType } from "shared/types/CardStatusType";

export interface ICard {
  id: string;
  title: string;
  description: string;
  board_id: string;
  category_id: string | null;
  author_id: string;
  status: CardStatusType;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}
