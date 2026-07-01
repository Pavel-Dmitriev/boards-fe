import { useEffect } from "react";
import { toast } from "sonner";
import { useStore } from "zustand";

import { createResourceStore } from "../createResourceStore";

import { api } from "shared/api";

import { getMessageError } from "shared/utils";

import type { ICard } from "shared/interfaces";

const stores = new Map<string, ReturnType<typeof createBoardCardsStore>>();

function createBoardCardsStore(boardId: string) {
  return createResourceStore<
    ICard,
    object,
    { createCard: (title: string, description: string, boardId: number) => Promise<void> }
  >({
    initialLimit: 5,
    fetchFn: async (params) => {
      const { page, limit } = params ?? {};
      const id = (params?.boardId || boardId) as string;

      const response = await api
        .get<{
          data: ICard[];
          meta: { total: number };
        }>(`/cards/?boardId=${id}&page=${page}&limit=${limit}`)
        .then((res) => res?.data);

      return { data: response.data, total: response.meta.total };
    },

    extraActions: (set, get) => ({
      createCard: async (title, description, boardId) => {
        set({ isLoading: true });

        try {
          await api
            .post<{ data: ICard }>("/cards", { title, description, boardId })
            .then((res) => res?.data?.data);

          await get().fetchPage(1, { boardId, page: 1, limit: get().limit });
        } catch (error) {
          toast.error(getMessageError(error));
        } finally {
          set({ isLoading: false });
        }
      },
    }),

    name: `CardsStore_${boardId}`,
  });
}

function getOrCreateStore(boardId: string) {
  if (!stores.has(boardId)) {
    stores.set(boardId, createBoardCardsStore(boardId));
  }

  return stores.get(boardId)!;
}

export function refetchBoardCards(boardId: string) {
  stores.get(boardId)?.getState().fetchPage(1);
}

export function useCardsStore(boardId?: string) {
  const id = boardId ?? "";
  const store = getOrCreateStore(id);

  const state = useStore(store);

  useEffect(() => {
    if (boardId) {
      state.fetchPage(1);
    }
  }, [boardId]);

  return state;
}
