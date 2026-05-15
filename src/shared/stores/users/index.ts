import { toast } from "sonner";
import { create } from "zustand";

import { api } from "shared/api";

import { getMessageError } from "shared/utils";

import type { IAction, IState } from "./interface";
import type { IProfile } from "shared/interfaces";

export const useUsersStore = create<IState & IAction>((set) => {
  return {
    profile: null,
    isLoading: false,

    getProfile: async () => {
      set({ isLoading: true });

      try {
        // async (): Promise<AxiosResponse<{ data: IProfile }>> => {
        //   return api.get("/users/profile");
        // }

        const data = await api
          .get<{ data: IProfile }>("/users/profile")
          .then((res) => res?.data?.data);

        set({ profile: data });
      } catch (error) {
        toast.error(getMessageError(error));
      } finally {
        set({ isLoading: false });
      }
    },
  };
});
