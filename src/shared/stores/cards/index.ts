import { toast } from "sonner";
import { create } from "zustand";

import { api } from "shared/api";

import { getMessageError } from "shared/utils";

import type { IAction, IState } from "./interface";
import type { ICard } from "shared/interfaces";

export const useCardsStore = create<IState & IAction>((set) => ({
  cards: [],
  cardsByBoardId: {},
  isLoading: false,

  createCard: async (title, description, boardId) => {
    set({ isLoading: true });

    try {
      const data = await api
        .post<{ data: ICard }>("/cards", { title, description, boardId })
        .then((res) => res?.data?.data);
      set((state) => ({ cards: [...state.cards, data] }));
    } catch (error) {
      toast.error(getMessageError(error));
    } finally {
      set({ isLoading: false });
    }
  },

  getCardsByBoardId: async (boardId) => {
    try {
      const data = await api
        .get<{ data: ICard[] }>(`/cards/?boardId=${boardId}`)
        .then((res) => res?.data?.data);

      set((state) => ({ cardsByBoardId: { ...state.cardsByBoardId, [boardId]: data } }));
    } catch (error) {
      toast.error(getMessageError(error));
    }
  },
}));
