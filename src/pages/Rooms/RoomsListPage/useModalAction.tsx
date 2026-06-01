import { useRef } from "react";
import { useShallow } from "zustand/shallow";

import { CreateRoomForm, EditRoomForm } from "./components";
import { Button } from "components/ui/Button";
import { useModalStore } from "components/ui/Modal/store";
import { useRoomsStore } from "shared/stores";

import type { IConfigFormModal } from "./interface";
import type { IRoom } from "shared/interfaces";

/**
 * Хук управления модалками для комнат.
 * Предоставляет открытие трёх модалок: создание, редактирование и удаление комнаты.
 * Каждое открытие форсирует remount формы через keyRef для сброса состояния useForm.
 */
function useModalAction() {
  const keyRef = useRef(0);
  const { deleteRoom } = useRoomsStore((state) => state);

  const { open, close } = useModalStore(useShallow(({ open, close }) => ({ open, close })));

  /**
   * Открывает форму-модалку со стандартными кнопками «Отмена / Submit».
   * @param config.title — заголовок модалки
   * @param config.children — контент (форма)
   * @param config.formId — id формы для связи кнопки submit
   * @param config.submitText — текст кнопки submit
   */
  const openFormModal = (config: IConfigFormModal) => {
    open({
      title: config.title,
      children: config.children,
      buttons: (
        <>
          <Button type="button" kind="secondary" onClick={close}>
            Отмена
          </Button>
          <Button type="submit" form={config.formId}>
            {config.submitText}
          </Button>
        </>
      ),
    });
  };

  /** Открывает модалку создания комнаты */
  const onOpenCreateModal = () => {
    keyRef.current += 1;

    openFormModal({
      title: "Создать комнату",
      formId: "board-form",
      submitText: "Создать",
      children: <CreateRoomForm key={keyRef.current} onClose={close} />,
    });
  };

  /**
   * Открывает модалку редактирования комнаты
   * @param room — данные комнаты (id, name, description)
   */
  const onOpenEditModal = (room: Pick<IRoom, "id" | "name" | "description">) => {
    keyRef.current += 1;

    openFormModal({
      title: "Редактировать комнату",
      formId: "edit-room-form",
      submitText: "Сохранить",
      children: (
        <EditRoomForm
          key={keyRef.current}
          id={room.id}
          name={room.name}
          description={room.description}
          onClose={close}
        />
      ),
    });
  };

  /**
   * Открывает модалку подтверждения удаления комнаты
   * @param id — идентификатор комнаты
   */
  const onOpenDeleteModal = (id: string) => {
    open({
      title: "Удалить комнату",
      children: <p>Вы уверены, что хотите удалить комнату?</p>,
      buttons: (
        <>
          <Button type="button" kind="secondary" onClick={close}>
            Отмена
          </Button>
          <Button
            type="button"
            onClick={() => {
              deleteRoom(id);
              close();
            }}
          >
            Удалить
          </Button>
        </>
      ),
    });
  };

  return { onOpenCreateModal, onOpenEditModal, onOpenDeleteModal };
}

export default useModalAction;
