import { toast } from "sonner";

import { createResourceStore } from "../createResourceStore";

import { api } from "shared/api";

import { getMessageError } from "shared/utils";

import type { IRoomsExtraActions, IRoomsExtraState } from "./interface";
import type { IRoom } from "shared/interfaces";

export const useRoomsStore = createResourceStore<IRoom, IRoomsExtraState, IRoomsExtraActions>({
  fetchFn: async ({ page, limit, search }) => {
    const searchParam = search ? `&search=${search}` : "";
    const res = await api.get(`/rooms?page=${page}&limit=${limit}${searchParam}`);

    return { data: res?.data?.data, total: res?.data.meta?.total };
  },

  initialLimit: 15,

  extraState: {
    room: null,
  },

  extraActions: (set, get): IRoomsExtraActions => ({
    getRooms: () => get().fetchPage(get().page ?? 1),

    getRoom: async (id) => {
      set({ isLoading: true });

      try {
        const data = await api.get<{ data: IRoom }>(`/rooms/${id}`).then((res) => res?.data?.data);

        set((state) => ({ ...state, room: data }));
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    createRoom: async (name, description) => {
      set({ isLoading: true });

      try {
        await api.post<{ data: IRoom }>("/rooms", { name, description });

        await get().fetchPage(get().page ?? 1);
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    updateRoom: async (id, name, description) => {
      set({ isLoading: true });

      try {
        await api.put<{ data: IRoom }>(`/rooms/${id}`, { name, description });

        await get().fetchPage(get().page ?? 1);
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    deleteRoom: async (id) => {
      set({ isLoading: true });

      try {
        await api.delete(`/rooms/${id}`);

        await get().fetchPage(get().page ?? 1);
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    joinRoom: async (id) => {
      set({ isLoading: true });

      try {
        await api.post(`/rooms/${id}/join`).then((res) => res?.data?.data);

        toast.success("Вы вступили в комнату");
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },
  }),

  name: "RoomsStore",
});
