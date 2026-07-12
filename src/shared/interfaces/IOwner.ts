export interface IOwner {
  /** Идентификатор */
  id: number;
  /** Имя владельца */
  name: string;
  /** Почта владельца */
  email: string;
  /** Дата создания */
  createdAt: string;
  /** Аватар владельца
   * TODO: пока не заведено на бэке н
   */
  avatar?: string;
}
