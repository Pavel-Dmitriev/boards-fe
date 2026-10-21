import LogoMark from "assets/logo-mark.svg?react";

/**
 * Логотип приложения: стопка карточек и название «Доски».
 */
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="text-lg font-medium">Доски</span>
    </span>
  );
}
