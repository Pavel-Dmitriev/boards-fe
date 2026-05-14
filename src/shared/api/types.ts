/** Элемент очереди запросов, ожидающих обновления токена */
export type QueueItemType = { resolve: (token: string) => void; reject: (error: unknown) => void };
