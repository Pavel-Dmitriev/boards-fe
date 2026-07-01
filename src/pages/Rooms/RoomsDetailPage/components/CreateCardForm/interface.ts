export interface ICreateCardFormValues {
  /** Название карточки */
  title: string;
  /** Описание карточки */
  description: string;
}

export interface ICreateCardFormProps {
  boardId: string;
  onClose: () => void;
}
