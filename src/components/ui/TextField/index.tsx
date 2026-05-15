import clsx from "clsx";
import isNil from "lodash-es/isNil";

import type { ITextField } from "./interface";

/**
 * Отображает строку вида «label: value» с единым стилем.
 * Если value отсутствует, показывается baseValue (по умолчанию «нет данных»).
 *
 * @param label — подпись слева от двоеточия
 * @param value — отображаемое значение (при falsy срабатывает baseValue)
 * @param baseValue — текст-заглушка, когда value отсутствует
 */
export function TextField({ label, value, baseValue = "нет данных" }: ITextField) {
  return (
    <div className="text-neutral/70 grid grid-cols-[max-content_1fr] gap-x-3 text-sm font-light">
      <p>{label}:</p>
      <div
        className={clsx("font-normal", {
          "text-primary": value,
          "text-neutral/40": !value,
        })}
      >
        {isNil(value) || value === "" ? baseValue : value}
      </div>
    </div>
  );
}
