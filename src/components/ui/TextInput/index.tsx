import clsx from "clsx";
import { useId } from "react";

import { Label } from "../Label";

import type { ITextInputProps } from "./interface";

/** Текстовое поле
 * @param props - пропсы для input, включая type, id и placeholder
 */
export function TextInput(props: ITextInputProps) {
  const { type, id, placeholder, required, label, className, errorClassName, ...rest } = props;

  const { children, ...restLabel } = label ?? {};

  const currentId = useId();
  const inputId = id ?? currentId;

  return (
    <Label
      text={children}
      fieldName={rest.name}
      childrenWrapperClassName={clsx("relative py-1.25 pr-9 pl-3.75", className)}
      {...{ inputId, type, required, errorClassName }}
      {...restLabel}
    >
      <input
        type={type}
        id={inputId}
        placeholder={placeholder}
        className="peer min-w-0 flex-1 text-sm text-gray-700 outline-none placeholder:overflow-hidden placeholder:text-ellipsis placeholder:text-slate-500 disabled:text-slate-500 disabled:placeholder:text-slate-400"
        {...rest}
      />
    </Label>
  );
}
