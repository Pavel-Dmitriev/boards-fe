import type { CardStatusType } from "shared/types/CardStatusType";

import type { IComment } from "shared/interfaces";

export interface ICardsExtraActions {
  /** Загрузить карточки доски */
  getCards: (boardId: string) => Promise<void>;
  /** Создать новую карточку */
  createCard: (title: string, description: string, boardId: string) => Promise<void>;
  /** Обновить карточку */
  updateCard: (
    cardId: string,
    data: { title?: string; description?: string; status?: CardStatusType },
  ) => Promise<void>;
  /** Удалить карточку */
  deleteCard: (cardId: string) => Promise<void>;
  /** Переключить голосование на карточке */
  toggleVote: (cardId: string) => Promise<void>;
  /** Загрузить комментарии карточки */
  fetchComments: (cardId: string) => Promise<void>;
  /** Создать комментарий */
  createComment: (cardId: string, content: string, parentId?: string) => Promise<void>;
}

export interface ICardsExtraState {
  /** Комментарии текущей карточки */
  comments: IComment[];
  /** Флаг загрузки комментариев */
  isCommentsLoading: boolean;
}

export interface IVoteData {
  /** Проголосовал ли пользователь за карточку */
  voted: boolean;
  /** Количество голосов карточки */
  votesCount: number;
}
