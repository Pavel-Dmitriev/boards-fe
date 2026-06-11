import { useRef } from "react";
import { useParams } from "react-router";
import { useShallow } from "zustand/shallow";

import { CreateBoardForm, CreateCardForm, EditBoardForm } from "./components";
import { Button } from "components/ui/Button";
import { useModalStore } from "components/ui/Modal/store";
import { useBoardsStore } from "shared/stores";

import type { IConfigFormModal } from "./interface";
import type { IBoard } from "shared/interfaces";

/**
 * Хук управления модалками для Досок.
 * Предоставляет открытие трёх модалок: создание, редактирование и удаление доски.
 * Каждое открытие форсирует remount формы через keyRef для сброса состояния useForm.
 */
function useModalAction() {
  const { id } = useParams();

  const keyRef = useRef(0);

  const { deleteBoard } = useBoardsStore((state) => state);

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

  /** Открывает модалку создания доски */
  const onOpenCreateModal = () => {
    keyRef.current += 1;

    openFormModal({
      title: "Создать доску",
      formId: "board-form",
      submitText: "Создать",
      children: <CreateBoardForm key={keyRef.current} roomId={id} onClose={close} />,
    });
  };

  /** Открывает модалку создания карточки */
  const onOpenCreateCardModal = (boardId: string) => {
    keyRef.current += 1;

    openFormModal({
      title: "Добавить карточку",
      formId: "card-form",
      submitText: "Добавить",
      children: <CreateCardForm key={keyRef.current} boardId={boardId} onClose={close} />,
    });
  };

  /**
   * Открывает модалку редактирования доски
   * @param board — данные доски (id, name, description)
   */
  const onOpenEditModal = (board: Pick<IBoard, "id" | "name" | "description">) => {
    keyRef.current += 1;

    openFormModal({
      title: "Редактировать доску",
      formId: "edit-board-form",
      submitText: "Сохранить",
      children: (
        <EditBoardForm
          key={keyRef.current}
          boardId={board.id}
          name={board.name}
          description={board.description}
          onClose={close}
        />
      ),
    });
  };

  /**
   * Открывает модалку подтверждения удаления доски
   * @param id — идентификатор доски
   */
  const onOpenDeleteModal = (id: string) => {
    open({
      title: "Удалить доску",
      children: <p>Вы уверены, что хотите удалить доску?</p>,
      buttons: (
        <>
          <Button type="button" kind="secondary" onClick={close}>
            Отмена
          </Button>
          <Button
            type="button"
            onClick={() => {
              deleteBoard(id);
              close();
            }}
          >
            Удалить
          </Button>
        </>
      ),
    });
  };

  return { onOpenCreateModal, onOpenEditModal, onOpenDeleteModal, onOpenCreateCardModal };
}

export default useModalAction;
