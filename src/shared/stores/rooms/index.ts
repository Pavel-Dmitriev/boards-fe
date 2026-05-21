import { toast } from "sonner";
import { create } from "zustand";

import { api } from "shared/api";

import { getMessageError } from "shared/utils";

import type { IAction, IState } from "./interface";
import type { IRoom } from "shared/interfaces";

export const useRoomsStore = create<IState & IAction>((set) => {
  return {
    rooms: [],
    room: null,
    isLoading: false,

    getRooms: async () => {
      set({ isLoading: true });

      try {
        const data = await api.get<{ data: IRoom[] }>("/rooms").then((res) => res?.data?.data);

        set({ rooms: data });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    getRoom: async (id) => {
      set({ isLoading: true });

      try {
        const data = await api.get<{ data: IRoom }>(`/rooms/${id}`).then((res) => res?.data?.data);

        set({ room: data });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    createRoom: async (name, description) => {
      set({ isLoading: true });

      try {
        const data = await api
          .post<{ data: IRoom }>("/rooms", { name, description })
          .then((res) => res?.data?.data);

        set((state) => ({ rooms: [...state.rooms, data] }));
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },

    updateRoom: async (id, name, description) => {
      set({ isLoading: true });

      try {
        const data = await api
          .put<{ data: IRoom }>(`/rooms/${id}`, { name, description })
          .then((res) => res?.data?.data);

        set((state) => ({
          rooms: state.rooms.map((room) => (room.id === id ? data : room)),
        }));
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

        set((state) => ({
          rooms: state.rooms.filter((room) => room.id !== id),
        }));
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
