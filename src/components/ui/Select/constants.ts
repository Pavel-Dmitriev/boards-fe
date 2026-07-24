import clsx from "clsx";

export const SELECT_CLASS_NAMES = {
  control: (state: { isFocused: boolean }) =>
    clsx("min-h-10 rounded-lg border bg-bg-input px-3 border-gray-300 dark:border-white/10", {
      "border-purple-600": state.isFocused,
    }),
  valueContainer: () => "p-0",
  input: () => "m-0 text-sm text-gray-700 dark:text-gray-200",
  placeholder: () => "text-sm text-slate-500",
  singleValue: () => "text-sm text-gray-700 dark:text-gray-200",
  option: (state: { isFocused: boolean; isSelected: boolean }) =>
    clsx("px-3 py-2 text-sm cursor-pointer", {
      "bg-purple-600 text-white": state.isSelected && !state.isFocused,
      "bg-purple-50 dark:bg-purple-900/30": state.isFocused && !state.isSelected,
      "bg-purple-700 text-white": state.isSelected && state.isFocused,
    }),
  menu: () =>
    "mt-1 rounded-lg border border-gray-300 dark:border-white/10 bg-bg-input shadow-sm !z-10",
  menuList: () => "rounded-lg overflow-hidden",
  noOptionsMessage: () => "px-3 py-4 text-sm text-slate-500 text-center",
};
