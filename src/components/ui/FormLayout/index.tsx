import { FormProvider, type Path, useForm, type UseFormReturn } from "react-hook-form";

import { TextArea, TextInput } from "components/ui";

import { FormRules } from "shared/enum";

import type { IFormLayoutProps } from "./interface";

export function FormLayout<T extends Record<string, string>>({
  formId,
  defaultValues,
  onSubmit,
  onClose,
  nameField,
  descriptionField,
  children,
}: IFormLayoutProps<T>) {
  const methods = useForm({ defaultValues });
  const { register, handleSubmit, reset } = methods as UseFormReturn<T>;

  const onFormSubmit = (data: T) => {
    onSubmit(data);

    onClose();
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4 p-1">
        <TextInput
          {...register(nameField.name, { required: FormRules.required })}
          label={{ children: nameField.label, required: true, hasWrapper: true }}
          placeholder={nameField.placeholder}
        />

        <TextArea
          {...register(descriptionField?.name ?? ("description" as Path<T>))}
          placeholder={descriptionField?.placeholder ?? "Введите описание"}
          label={{ children: descriptionField?.label ?? "Описание", hasWrapper: true }}
          rows={3}
        />

        {children}
      </form>
    </FormProvider>
  );
}
