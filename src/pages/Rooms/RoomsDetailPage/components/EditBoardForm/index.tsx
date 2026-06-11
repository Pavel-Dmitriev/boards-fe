import { FormLayout } from "components/ui";
import { useBoardsStore } from "shared/stores";

import type { IEditBoardFormProps } from "./interface";

/**
 * Форма редактирования доски.
 * Содержит поля «Название» и «Описание», при сабмите вызывает updateBoard.
 */
export default function EditBoardForm(props: IEditBoardFormProps) {
  const { boardId, name, description, onClose } = props ?? {};

  const updateBoard = useBoardsStore((state) => state.updateBoard);

  return (
    <FormLayout
      formId="edit-board-form"
      defaultValues={{ name, description }}
      nameField={{ name: "name", label: "Название доски", placeholder: "Введите название доски" }}
      descriptionField={{ name: "description", label: "Описание", placeholder: "Введите описание" }}
      onSubmit={({ name, description }) => {
        if (boardId) updateBoard(boardId, name, description);
      }}
      onClose={onClose}
    />
  );
}
