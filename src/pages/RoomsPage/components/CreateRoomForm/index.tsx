import { FormProvider, useForm } from "react-hook-form";

import { TextArea, TextInput } from "components/ui";
import { useRoomsStore } from "shared/stores";

import { DEFAULT_VALUES } from "pages/RoomsPage/constants";
import { FormRules } from "shared/enum";

import type { ICreateRoomFormProps } from "./interface";
import type { IFormData } from "pages/RoomsPage/interface";

/**
 * Форма создания комнаты.
 * Содержит поля «Название» и «Описание», при сабмите вызывает createRoom.
 */
export default function CreateRoomForm({ onClose }: ICreateRoomFormProps) {
  const { createRoom } = useRoomsStore((state) => state);

  const methods = useForm<IFormData>({ defaultValues: DEFAULT_VALUES });
  const { register, handleSubmit, reset } = methods;

  /** Создать комнату, сбросить форму и закрыть модалку */
  const onSubmit = ({ name, description }: IFormData) => {
    createRoom(name, description);
    reset();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form id="board-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-1">
        <TextInput
          {...register("name", { required: FormRules.required })}
          label={{ children: "Название комнаты", required: true, hasWrapper: true }}
          placeholder="Введите название комнаты"
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
