import { toast } from "sonner";

import { createResourceStore } from "../createResourceStore";

import { api } from "shared/api";

import { getMessageError } from "shared/utils";

import type { ICardsExtraActions, ICardsExtraState } from "./interface";
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
    commentsLoading: false,
  },

  extraActions: (set, get) => ({
    getCards: async (boardId) => {
      await get().fetchPage(1, { boardId });
    },

    createCard: async (title, description, boardId) => {
      set({ isLoading: true });

      try {
        await api.post("/cards", { title, description, boardId: Number(boardId) });

        await get().fetchPage(1, { boardId, page: 1, limit: get().limit });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    updateCard: async (cardId, data) => {
      set({ isLoading: true });

      try {
        const res = await api
          .put<{ data: ICard }>(`/cards/${cardId}`, data)
          .then((res) => res?.data);

        set((state) => ({
          ...state,
          data: state.data.map((card) => (card.id === cardId ? { ...card, ...res.data } : card)),
        }));
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    deleteCard: async (cardId) => {
      try {
        await api.delete(`/cards/${cardId}`);

        set((state) => ({
          ...state,
          data: state.data.filter((card) => card.id !== cardId),
          total: state.total - 1,
        }));
      } catch (error) {
        toast.error(getMessageError(error));
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggleVote: async (_cardId) => {},

    fetchComments: async (cardId) => {
      set({ commentsLoading: true });

      try {
        const res = await api
          .get<{ data: IComment[] }>(`/comments?cardId=${cardId}`)
          .then((res) => res?.data);

        set({ comments: res.data });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ commentsLoading: false });
      }
    },

    createComment: async (cardId, content, parentId) => {
      try {
        const res = await api
          .post<{
            data: IComment;
          }>(`/comments`, { content, cardId, parentId })
          .then((res) => res?.data);

        set((state) => ({
          ...state,
          comments: [...state.comments, res.data],
        }));
      } catch (error) {
        toast.error(getMessageError(error));
      }
    },
  }),

  name: "CardsStore",
});
