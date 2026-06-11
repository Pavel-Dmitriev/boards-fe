/** Пропсы формы редактирования доски */
export interface IEditBoardFormProps {
  /** Идентификатор доски */
  boardId: string;
  /** Название доски */
  name: string;
  /** Описание доски */
  description: string;
  /** Закрыть модалку */
  onClose: () => void;
}
