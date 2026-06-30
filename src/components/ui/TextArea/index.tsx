import clsx from "clsx";
import { type SyntheticEvent, useId } from "react";

import { Label } from "../Label";

import type { ITextAreaProps } from "./interface";

/**
 * Многострочное текстовое поле, которое автоматически подстраивается по высоте в зависимости от количества текста.
 * @param props - пропсы для textarea, включая id и placeholder
 */
export function TextArea(props: ITextAreaProps) {
  const { id, placeholder, required, label, className, errorClassName, ...rest } = props;

  const { children, ...restLabel } = label ?? {};

  const currentId = useId();
  const inputId = id ?? currentId;

  const handleInput = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    const element = e.currentTarget;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight }px`;
  };

  return (
    <Label
      text={children}
      fieldName={rest.name}
      childrenWrapperClassName={clsx("relative py-2 pr-9 pl-3.75", className)}
      {...{ inputId, required, errorClassName }}
      {...restLabel}
    >
      <textarea
        id={inputId}
        placeholder={placeholder}
        className="peer min-h-20 min-w-0 flex-1 resize-none text-sm text-gray-700 outline-none placeholder:text-slate-500 disabled:text-slate-500 disabled:placeholder:text-slate-400"
        onInput={handleInput}
        {...rest}
      />
    </Label>
  );
}
