import { Button } from "components/ui";

import type { IHeaderProps } from "./interface";

/**
 * Заголовок страницы списка комнат.
 * Содержит заголовок, описание и кнопку создания комнаты.
 */
export function Header({ onCreateRoom }: IHeaderProps) {
  return (
    <div className="mb-12 grid grid-cols-2 items-center justify-items-start gap-x-6">
      <div>
        <h1 className="mb-3 text-4xl font-medium">
          <span className="gradient-text">Комнаты</span>
        </h1>
        <p className="text-neutral/70 text-lg">Выберите комнату для просмотра досок и карточек</p>
      </div>
      <div className="justify-self-end" onClick={onCreateRoom}>
        <Button>Создать комнату</Button>
      </div>
    </div>
  );
}
