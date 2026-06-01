import { FormProvider, useForm } from "react-hook-form";

import { TextArea, TextInput } from "components/ui";
import { useRoomsStore } from "shared/stores";

import { FormRules } from "shared/enum";

import type { IEditRoomFormProps } from "./interface";
import type { IFormData } from "pages/Rooms/RoomsListPage/interface";

/**
 * Форма редактирования комнаты.
 * Инициализируется переданными name/description через defaultValues.
 * При сабмите вызывает updateRoom.
 */
export default function EditRoomForm(props: IEditRoomFormProps) {
  const { id, name, description, onClose } = props ?? {};

  const methods = useForm<IFormData>({ defaultValues: { name, description } });
  const { register, handleSubmit, reset } = methods;

  const { updateRoom } = useRoomsStore((state) => state);

  /** Обновить комнату, сбросить форму и закрыть модалку */
  const onSubmit = ({ name, description }: IFormData) => {
    updateRoom(id, name, description);
    reset();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form
        id="edit-room-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-1"
      >
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
