import { FormProvider, useForm } from "react-hook-form";

import { TextArea, TextInput } from "components/ui";
import { useBoardsStore } from "shared/stores";

import { DEFAULT_VALUES } from "./constants";
import { FormRules } from "shared/enum";

import type { ICreateBoardFormProps } from "./interface";
import type { IFormData } from "pages/Rooms/RoomsListPage/interface";

/**
 * Форма создания доски.
 * Содержит поля «Название» и «Описание», при сабмите вызывает createBoard.
 */
export default function CreateBoardForm({ roomId, onClose }: ICreateBoardFormProps) {
  const { createBoard } = useBoardsStore((state) => state);

  const methods = useForm<IFormData>({ defaultValues: DEFAULT_VALUES });
  const { register, handleSubmit, reset } = methods;

  /** Создать комнату, сбросить форму и закрыть модалку */
  const onSubmit = ({ name, description }: IFormData) => {
    if (roomId) {
      createBoard(name, description, roomId);
    }
    reset();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form id="board-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-1">
        <TextInput
          {...register("name", { required: FormRules.required })}
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
