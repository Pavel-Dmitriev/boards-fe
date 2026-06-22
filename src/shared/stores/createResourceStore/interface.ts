import type { IMeta } from "shared/interfaces/IMeta";

/** Функция обновления состояния стора */
export type SetState<T> = (
  partial: Partial<T> | ((state: T) => Partial<T>),
  replace?: boolean,
) => void;

/** Функция получения текущего состояния стора */
export type GetState<T> = () => T;

/** Параметры для функции выборки данных */
export interface IFetchParams extends Omit<IMeta, "total">, Record<string, any> {}

/** Состояние пагинируемого ресурса */
export interface IResourceState<T> extends IMeta {
  /** Массив данных текущей страницы */
  data: T[];
  /** Флаг загрузки данных */
  isLoading: boolean;
  /** Сообщение об ошибке или null, если ошибок нет */
  error: string | null;
}

/** Действия/методы для управления пагинацией */
export interface IResourceActions {
  /** Загрузить указанную страницу (optionally с доп. параметрами) */
  fetchPage: (page: number, params?: Record<string, any>) => Promise<void>;
  /** Перейти на следующую страницу */
  nextPage: (params: Record<string, any>) => Promise<void>;
  /** Перейти на предыдущую страницу */
  prevPage: (params: Record<string, any>) => Promise<void>;
  /** Установить лимит элементов на страницу */
  setLimit: (limit: number) => void;
  /** Сбросить состояние до начального */
  reset: () => void;
}

/** Конфигурация стора */
export interface IResourceStoreConfig<T, ExtraState, ExtraActions> {
  /** Функция выборки данных. Принимает параметры page и limit и возвращает данные и общий total */
  fetchFn: (params: IFetchParams) => Promise<{ data: T[]; total: number }>;
  /** Начальный лимит элементов на страницу (по умолчанию может быть задан в реализации) */
  initialLimit?: number;
  /** Дополнительное состояние, добавляемое в стор */
  extraState?: ExtraState;
  /** Дополнительные действия. Принимает set/get функции стора и возвращает объект действий */
  extraActions?: (
    set: SetState<IResourceState<T> & ExtraState>,
    get: GetState<IResourceState<T> & IResourceActions & ExtraState>,
  ) => ExtraActions;
  /** Опциональное имя стора (для отладки/логирования) */
  name?: string;
}
