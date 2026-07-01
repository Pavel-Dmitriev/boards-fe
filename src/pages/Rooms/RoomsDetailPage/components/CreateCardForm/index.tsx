import { FormLayout } from "components/ui";
import { useCardsStore } from "shared/stores";

import { DEFAULT_VALUES } from "./constants";

import type { ICreateCardFormProps, ICreateCardFormValues } from "./interface";

/**
 * Форма создания карточки.
 * Содержит поля «Название» и «Описание», при сабмите вызывает createCard.
 */
export default function CreateCardForm({ boardId, onClose }: ICreateCardFormProps) {
  const { createCard } = useCardsStore(boardId);

  /** Метод, вызываемый при отправке формы */
  const onSubmit = async ({ title, description }: ICreateCardFormValues) => {
    if (boardId) {
      await createCard(title, description, Number(boardId));
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
