import { FormLayout } from "components/ui";
import { useBoardsStore } from "shared/stores";

import { DEFAULT_VALUES } from "./constants";

import type { ICreateBoardFormProps } from "./interface";

/**
 * Форма создания доски.
 * Содержит поля «Название» и «Описание», при сабмите вызывает createBoard.
 */
export default function CreateBoardForm({ roomId, onClose }: ICreateBoardFormProps) {
  const createBoard = useBoardsStore((state) => state.createBoard);

  return (
    <FormLayout
      formId="board-form"
      defaultValues={DEFAULT_VALUES}
      nameField={{ name: "name", label: "Название доски", placeholder: "Введите название доски" }}
      descriptionField={{ name: "description", label: "Описание", placeholder: "Введите описание" }}
      onSubmit={({ name, description }) => {
        if (roomId) createBoard(name, description, roomId);
      }}
      onClose={onClose}
    />
  );
}
