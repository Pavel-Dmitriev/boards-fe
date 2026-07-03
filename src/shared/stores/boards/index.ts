import { toast } from "sonner";

import { createResourceStore } from "../createResourceStore";

import { api } from "shared/api";

import { getMessageError } from "shared/utils";

import type { IBoardsExtraActions } from "./interface";
import type { IBoard } from "shared/interfaces";

export const useBoardsStore = createResourceStore<IBoard, {}, IBoardsExtraActions>({
  initialLimit: 20,
  fetchFn: async ({ page, limit, roomId }) => {
    const res = await api.get(`/boards?roomId=${roomId}&page=${page}&limit=${limit}`);

    return { data: res.data.data, total: res.data.meta?.total };
  },

  extraActions: (set, get): IBoardsExtraActions => ({
    createBoard: async (name, description, roomId) => {
      set({ isLoading: true });

      try {
        await api.post("boards", { name, description, roomId: Number(roomId) });

        await get().fetchPage(get().page, { roomId });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    getBoards: (roomId: string) => get().fetchPage(1, { roomId }),

    updateBoard: async (boardId, name, description, roomId) => {
      set({ isLoading: true });

      try {
        await api.put(`/boards/${boardId}`, { name, description });

        await get().fetchPage(get().page, { roomId });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    deleteBoard: async (boardId, roomId) => {
      set({ isLoading: true });

      try {
        await api.delete(`/boards/${boardId}`);

        await get().fetchPage(get().page, { roomId });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },
  }),

  name: "BoardsStore",
});
