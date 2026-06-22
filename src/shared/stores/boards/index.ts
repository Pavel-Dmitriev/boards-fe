import { toast } from "sonner";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { api } from "shared/api";

import { getMessageError } from "shared/utils";

import type { IBoardsAction, IBoardsState } from "./interface";
import type { IBoard } from "shared/interfaces";

export const useBoardsStore = create<IBoardsState & IBoardsAction>()(
  devtools(
    (set) => ({
      boards: [],
      isLoading: false,

      createBoard: async (name, description, roomId) => {
        set({ isLoading: true });
        try {
          const data = await api
            .post<{ data: IBoard }>("boards", { name, description, roomId: Number(roomId) })
            .then((res) => res?.data?.data);

          set((state) => ({ boards: [...state.boards, data] }), undefined, "boards/createBoard");
        } catch (error) {
          toast.error(getMessageError(error));
        } finally {
          set({ isLoading: false });
        }
      },
      getBoards: async (roomId) => {
        set({ isLoading: true });

        try {
          const data = await api
            .get<{ data: IBoard[] }>(`/boards/?roomId=${roomId}`)
            .then((res) => res?.data?.data);

          set({ boards: data }, undefined, "boards/getBoards");
        } catch (error) {
          toast.error(getMessageError(error));
        } finally {
          set({ isLoading: false });
        }
      },

      updateBoard: async (boardId, name, description) => {
        set({ isLoading: true });

        try {
          const data = await api
            .put<{ data: IBoard }>(`/boards/${boardId}`, { name, description })
            .then((res) => res?.data?.data);

          set(
            (state) => ({
              boards: state.boards.map((board) => (board.id === boardId ? data : board)),
            }),
            undefined,
            "boards/updateBoard",
          );
        } catch (error) {
          toast.error(getMessageError(error));
        } finally {
          set({ isLoading: false });
        }
      },

      deleteBoard: async (boardId) => {
        set({ isLoading: true });

        try {
          await api.delete(`/boards/${boardId}`);

          set(
            (state) => ({
              boards: state.boards.filter((board) => board.id !== boardId),
            }),
            undefined,
            "boards/deleteBoard",
          );
        } catch (error) {
          toast.error(getMessageError(error));
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: "BoardsStore" },
  ),
);
