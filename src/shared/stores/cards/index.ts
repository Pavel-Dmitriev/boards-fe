import { toast } from "sonner";

import { createResourceStore } from "../createResourceStore";

import { api } from "shared/api";

import { getMessageError } from "shared/utils";

import type { ICardsExtraActions, ICardsExtraState, IVoteData } from "./interface";
import type { ICard, IComment } from "shared/interfaces";

export const useCardsStore = createResourceStore<ICard, ICardsExtraState, ICardsExtraActions>({
  initialLimit: 10,

  fetchFn: async ({ page, limit, boardId }) => {
    const response = await api
      .get<{
        data: ICard[];
        meta: { total: number };
      }>(`/cards?boardId=${boardId}&page=${page}&limit=${limit}`)
      .then((res) => res?.data);

    return { data: response.data, total: response.meta.total };
  },

  extraState: {
    comments: [],
    isCommentsLoading: false,
  },

  extraActions: (set, get) => ({
    getCards: async (boardId) => {
      await get().fetchPage(1, { boardId });
    },

    createCard: async (title, description, boardId) => {
      set({ isLoading: true }, false, "createCard/start");

      try {
        await api.post("/cards", { title, description, boardId: Number(boardId) });

        await get().fetchPage(1, { boardId, page: 1, limit: get().limit });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false }, false, "createCard/end");
      }
    },

    updateCard: async (cardId, data) => {
      set({ isLoading: true }, false, "updateCard/start");

      try {
        const res = await api
          .put<{ data: ICard }>(`/cards/${cardId}`, data)
          .then((res) => res?.data);

        set(
          (state) => ({
            ...state,
            data: state.data.map((card) => (card.id === cardId ? { ...card, ...res.data } : card)),
          }),
          false,
          "updateCard/success",
        );
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false }, false, "updateCard/end");
      }
    },

    deleteCard: async (cardId) => {
      try {
        await api.delete(`/cards/${cardId}`);

        set(
          (state) => ({
            ...state,
            data: state.data.filter((card) => card.id !== cardId),
            total: state.total - 1,
          }),
          false,
          "deleteCard",
        );
      } catch (error) {
        toast.error(getMessageError(error));
      }
    },

    toggleVote: async (cardId) => {
      try {
        const res = await api
          .post<{ data: IVoteData }>(`/cards/${cardId}/vote`)
          .then((res) => res?.data);

        set(
          (state) => ({
            ...state,
            data: state.data.map((card) => {
              if (card.id === cardId) {
                return { ...card, votesCount: res.data.votesCount, voted: res.data.voted };
              }

              return card;
            }),
          }),
          false,
          "toggleVote",
        );
      } catch (error) {
        toast.error(getMessageError(error));
      }
    },

    fetchComments: async (cardId) => {
      set({ isCommentsLoading: true }, false, "fetchComments/start");

      try {
        const res = await api
          .get<{ data: IComment[] }>(`/comments?cardId=${cardId}`)
          .then((res) => res?.data);

        set({ comments: res.data }, false, "fetchComments/success");
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isCommentsLoading: false }, false, "fetchComments/end");
      }
    },

    createComment: async (cardId, content, parentId) => {
      try {
        const res = await api
          .post<{
            data: IComment;
          }>(`/comments`, { content, cardId, parentId })
          .then((res) => res?.data);

        set(
          (state) => ({
            ...state,
            comments: [...state.comments, res.data],
          }),
          false,
          "createComment",
        );
      } catch (error) {
        toast.error(getMessageError(error));
      }
    },
  }),

  name: "CardsStore",
});
