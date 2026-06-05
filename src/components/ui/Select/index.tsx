import clsx from "clsx";
import { useId } from "react";
import { Controller, type FieldValues, useFormContext } from "react-hook-form";
import ReactSelect, { type ClassNamesConfig, type GroupBase, type Props } from "react-select";

import { Label } from "../Label";

import { SELECT_CLASS_NAMES } from "./constants";

import type { ISelectProps } from "./interface";

/** Выпадающий список на react-select с интеграцией react-hook-form */
export function Select<
  IFieldValues extends FieldValues,
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: ISelectProps<IFieldValues> & Props<Option, IsMulti, Group>) {
  const { name, id, label, rules, required, className, errorClassName, onChange, ...rest } = props;

  const { children: labelChildren, ...restLabel } = label ?? {};
  const { control } = useFormContext();

  const currentId = useId();

  const inputId = id ?? currentId;

  const classNames: ClassNamesConfig<Option, IsMulti, Group> = {
    ...SELECT_CLASS_NAMES,
    control: (state) =>
      clsx(SELECT_CLASS_NAMES.control(state), {
        "bg-gray-100!": rest.isDisabled,
      }),
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Label
          text={labelChildren}
          fieldName={name}
          childrenWrapperClassName={clsx("border-0! bg-transparent! p-0!", className)}
          inputId={inputId}
          required={required}
          errorClassName={errorClassName}
          customError={error?.message}
          {...restLabel}
        >
          <ReactSelect
            {...field}
            {...rest}
            onChange={(option, actionMeta) => {
              field.onChange(option);
              onChange?.(option, actionMeta);
            }}
            loadingMessage={() => "Загрузка..."}
            noOptionsMessage={() => "Нет данных"}
            unstyled
            classNames={classNames}
          />
        </Label>
      )}
    />
  );
}
