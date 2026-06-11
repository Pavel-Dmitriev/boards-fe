import { FormLayout } from "components/ui";
import { useBoardsStore, useCardsStore } from "shared/stores";

import { DEFAULT_VALUES } from "./constants";

import type { ICreateCardFormValues } from "./interface";

/**
 * Форма создания карточки.
 * Содержит поля «Название» и «Описание», при сабмите вызывает createCard.
 */
export default function CreateCardForm({ boardId, onClose }: any) {
  const createCard = useCardsStore((state) => state.createCard);
  const getCardsByBoardId = useBoardsStore((state) => state.getCardsByBoardId);

  /** Метод, вызываемый при отправке формы
   * Вызывает createCard с данными из формы, а затем обновляет список карточек для доски через getCardsByBoardId.
   */
  const onSubmit = async ({ title, description }: ICreateCardFormValues) => {
    if (boardId) {
      await createCard(title, description, Number(boardId));
      getCardsByBoardId(boardId);
    }
  };

  return (
    <FormLayout
      formId="card-form"
      defaultValues={DEFAULT_VALUES}
      nameField={{
        name: "title",
        label: "Название карточки",
        placeholder: "Введите название карточки",
      }}
      descriptionField={{ name: "description", label: "Описание", placeholder: "Введите описание" }}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
}
