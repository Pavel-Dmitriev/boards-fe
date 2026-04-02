export type Role = "admin" | "moderator" | "user";

export type CardStatus = "new" | "in_progress" | "completed" | "rejected";

export type SortOption = "votes" | "date_desc" | "date_asc" | "comments" | "alphabetical";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  created_at: string;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  board_id: string;
  created_at: string;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  board_id: string;
  category_id: string | null;
  author_id: string;
  status: CardStatus;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
}

export interface Vote {
  user_id: string;
  card_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  content: string;
  card_id: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  status: number;
}
