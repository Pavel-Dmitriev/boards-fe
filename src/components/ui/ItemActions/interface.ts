/** Пропсы кнопок редактирования и удаления */
export interface IItemActionsProps {
  /** Обработчик редактирования */
  onEdit?: () => void;
  /** Обработчик удаления */
  onDelete?: () => void;
}
