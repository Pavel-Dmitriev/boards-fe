import clsx from "clsx";
import get from "lodash-es/get";
import { Fragment } from "react";
import { useFormContext, useFormState } from "react-hook-form";

import type { ILabelProps } from "./interface";

/** Компонент для отображения label и ошибок в формах */
export function Label(props: ILabelProps) {
  const {
    type = "text",
    text,
    hasWrapper,
    inputId,
    children,
    fieldName,
    required,
    childrenWrapperClassName,
    additionalElement,
    errorClassName,
    customError,
    ...rest
  } = props;

  const { control } = useFormContext() ?? {};
  const { errors } = useFormState({ control });

  const error = customError ?? (get(errors, `${fieldName}.message`, "") as string);

  const Wrapper = hasWrapper ? "div" : Fragment;

  return (
    <Wrapper>
      <label
        {...rest}
        htmlFor={inputId}
        className={clsx("mb-2 inline-block text-sm text-gray-700", rest?.className)}
      >
        {text}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      {Boolean(error) && (
        <p className={clsx("-mt-2 mb-2 text-xs whitespace-pre-wrap text-red-600", errorClassName)}>
          {error}
        </p>
      )}

      <div
        className={clsx(
          "flex max-w-full items-center self-start rounded-lg border border-gray-300 bg-white outline-offset-2 focus-within:outline-1",
          "has-disabled:border-gray-100 has-disabled:bg-gray-100",
          {
            "outline-1 outline-red-500": error,
            "outline-purple-600": !error,
            "pr-3.75! [&_input]:flex-1 [&_input]:pr-5": additionalElement,
            "*:min-w-full": !additionalElement,
          },
          Boolean(text) && {
            "w-33": type === "number",
          },
          childrenWrapperClassName,
        )}
      >
        {children}

        {additionalElement}
      </div>
    </Wrapper>
  );
}
