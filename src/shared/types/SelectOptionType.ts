/** Значение селекта */
export type SelectOptionType<TValue = string | number | boolean> = {
  label: string;
  value: TValue;
} & Record<string, unknown>;
