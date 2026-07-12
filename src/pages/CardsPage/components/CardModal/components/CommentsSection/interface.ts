import type { IComment } from "shared/interfaces";

export interface ICommentsSectionProps {
  comments: IComment[];
  isLoading: boolean;
}
