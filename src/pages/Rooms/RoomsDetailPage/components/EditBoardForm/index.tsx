import { FormProvider, useForm } from "react-hook-form";

import { TextArea, TextInput } from "components/ui";
import { useBoardsStore } from "shared/stores";

import { FormRules } from "shared/enum";

import type { IEditBoardFormProps } from "./interface";

interface IFormData {
  title: string;
  description: string;
}

export default function EditBoardForm(props: IEditBoardFormProps) {
  const { boardId, title, description, onClose } = props ?? {};

  const methods = useForm<IFormData>({ defaultValues: { title, description } });
  const { register, handleSubmit, reset } = methods;

  const { updateBoard } = useBoardsStore((state) => state);

  const onSubmit = ({ title, description }: IFormData) => {
    updateBoard(boardId, title, description);
    reset();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form
        id="edit-board-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-1"
      >
        <TextInput
          {...register("title", { required: FormRules.required })}
          label={{ children: "Название доски", required: true, hasWrapper: true }}
          placeholder="Введите название доски"
        />
        <TextArea
          {...register("description")}
          placeholder="Введите описание"
          label={{ children: "Описание", hasWrapper: true }}
          rows={3}
        />
      </form>
    </FormProvider>
  );
}
