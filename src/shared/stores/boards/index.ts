import { toast } from "sonner";

import { createResourceStore } from "../createResourceStore";

import { api } from "shared/api";

import { getMessageError } from "shared/utils";

import type { IBoardsExtraActions } from "./interface";
import type { IBoard } from "shared/interfaces";

export const useBoardsStore = createResourceStore<IBoard, {}, IBoardsExtraActions>({
  initialLimit: 5,
  fetchFn: async ({ page, limit, roomId }) => {
    const res = await api.get(`/boards?roomId=${roomId}&page=${page}&limit=${limit}`);

    return { data: res.data.data, total: res.data.meta?.total };
  },

  extraActions: (set, get): IBoardsExtraActions => ({
    createBoard: async (name, description, roomId) => {
      set({ isLoading: true });

      try {
        const res = await api.post("boards", { name, description, roomId: Number(roomId) });
        const newBoard = res.data.data;

        set((state) => ({ data: [...state.data, newBoard] }));
        get().fetchPage(get().page, { roomId });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    getBoards: (roomId: string) => get().fetchPage(1, { roomId }),

    updateBoard: async (boardId, name, description) => {
      set({ isLoading: true });

      try {
        const res = await api.put(`/boards/${boardId}`, { name, description });
        const updatedBoard = res.data.data;

        set((state) => ({
          data: state.data.map((b) => (b.id === boardId ? updatedBoard : b)),
        }));
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

        set((state) => ({
          data: state.data.filter((b) => b.id !== boardId),
        }));
        get().fetchPage(get().page, { roomId });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },
  }),

  name: "BoardsStore",
});
