import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { IResourceActions, IResourceState, IResourceStoreConfig } from "./interface";

export function createResourceStore<T, ExtraState = {}, ExtraActions = {}>({
  fetchFn,
  initialLimit = 10,
  extraState = {} as ExtraState,
  extraActions = () => ({}) as ExtraActions,
  name = "createResourceStore",
}: IResourceStoreConfig<T, ExtraState, ExtraActions>) {
  return create<IResourceState<T> & IResourceActions & ExtraState & ExtraActions>()(
    devtools(
      (set, get) => ({
        data: [],
        total: 0,
        page: 1,
        limit: initialLimit,
        isLoading: false,
        error: null,

        fetchPage: async (page, params = {}) => {
          set((state) => ({ ...state, isLoading: true, error: null }));
          try {
            const { limit } = get();

            const result = await fetchFn({ page, limit, ...params });

            set((state) => ({
              ...state,
              data: result.data,
              total: result.total,
              page,
              isLoading: false,
            }));
          } catch (err: any) {
            set((state) => ({ ...state, error: err.message, isLoading: false }));
          }
        },

        nextPage: async (params: Record<string, any> = {}) => {
          const { page, limit, total, fetchPage, data: previousData } = get();
          const totalPages = Math.ceil(total / limit);
          if (page < totalPages) {
            await fetchPage(page + 1, params);

            set((state) => ({
              ...state,
              data: [...previousData, ...state.data],
            }));
          }
        },

        prevPage: async (params: Record<string, any> = {}) => {
          const { page, fetchPage } = get();
          if (page > 1) {
            await fetchPage(page - 1, params);
          }
        },

        setLimit: (newLimit: number) => {
          set((state) => ({ ...state, limit: newLimit, page: 1 }));
          get().fetchPage(1);
        },

        reset: () =>
          set((state) => ({
            ...state,
            data: [],
            total: 0,
            page: 1,
            isLoading: false,
            error: null,
          })),

        ...extraState,

        ...(extraActions(set as any, get as any) as ExtraActions),
      }),
      { name },
    ),
  );
}
