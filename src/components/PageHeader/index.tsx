import { Button } from "components/ui";

import type { IHeaderProps } from "./interface";

/**
 * Заголовок страницы.
 * Содержит заголовок, описание и кнопку создания сущности.
 */
function PageHeader({ title, description, titleBtn, onCreate }: IHeaderProps) {
  return (
    <div className="mb-12 grid grid-cols-2 items-center justify-items-start gap-x-6">
      <div>
        <h1 className="mb-3 text-4xl font-medium">
          <span className="gradient-text">{title}</span>
        </h1>
        <p className="text-neutral/70 text-lg">{description}</p>
      </div>
      <div className="justify-self-end">
        <Button onClick={onCreate}>{titleBtn}</Button>
      </div>
    </div>
  );
}

export default PageHeader;
