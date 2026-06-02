import { FormProvider, useForm } from "react-hook-form";

import Card from "components/Card";
import { TextArea, TextInput } from "components/ui";
import { Button } from "components/ui/Button";
import { useModalStore } from "components/ui/Modal/store";

import { DEFAULT_VALUES } from "./constants";
import { MOCK } from "./mock";
import { FormRules } from "shared/enum";

import type { IModalConfig } from "components/ui/Modal/store/interface";
import type { IBoard, ICard } from "shared/interfaces";

/** Страница подробной информации о комнате */
export function RoomsDetailPage() {
  const { name, description, boards } = MOCK;

  const methods = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const { register, handleSubmit, reset } = methods;

  const { open, close } = useModalStore();

  const handleSubmitForm = (data: { title: string; description: string }) => {
    console.log("data:", data);
    // TODO: Здесь можно добавить логику для отправки данных на сервер или обновления состояния
  };

  const handleCloseModal = () => {
    close();
    reset();
  };

  const handleCardListWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.currentTarget.scrollLeft += e.deltaY;
  };

  const modalConfig: IModalConfig = {
    title: "Создать доску",
    wrapper: (content) => <FormProvider {...methods}>{content}</FormProvider>,
    children: (
      <form
        id="board-form"
        onSubmit={handleSubmit((data) => {
          handleSubmitForm(data);
          handleCloseModal();
        })}
        className="flex flex-col gap-4 p-1"
      >
        <TextInput
          {...register("title", {
            required: FormRules.required,
          })}
          label={{ children: "Название доски", required: true, hasWrapper: true }}
          placeholder="Введите название доски"
        />

        <TextArea
          {...register("description")}
          placeholder="Введите описание"
          label={{ children: "Описание", hasWrapper: true }}
          rows={3}
        />
      </form>
    ),
    buttons: (
      <>
        <Button type="button" kind="secondary" onClick={handleCloseModal}>
          Отмена
        </Button>
        <Button type="submit" form="board-form">
          Создать
        </Button>
      </>
    ),
  };

  return (
    <>
      <div className="mb-12 grid grid-cols-2 items-center justify-items-start gap-x-6 text-center">
        <div>
          <h1 className="mb-3 text-4xl font-medium">
            <span className="gradient-text">{name}</span>
          </h1>
          {description && <p className="text-neutral/70 text-left text-lg">{description}</p>}
        </div>
        <div className="justify-self-end" onClick={() => open(modalConfig)}>
          <Button>Создать доску</Button>
        </div>
      </div>

      {boards?.length === 0 ? (
        <p className="text-neutral/70 text-center">В этой комнате пока нет досок</p>
      ) : (
        <div>
          {boards?.map((board: IBoard) => (
            <article key={board.id} className="card grid grid-cols-[28rem_1px_1fr] gap-x-6">
              <div className="flex flex-col">
                <h2 className="mb-2 text-xl font-medium">{board.title}</h2>
                <p className="text-neutral/70 mb-4 flex-1 text-sm">{board.description}</p>
                <div className="flex items-center justify-between">
                  <span className="badge text-xs">Всего карточек: {board.cards?.length ?? 0}</span>
                  {board.owner?.name && (
                    <span className="text-neutral/70 text-xs">{board.owner.name}</span>
                  )}
                </div>
              </div>
              <div className="h-full rounded-full bg-gray-200" />
              <div
                className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 active:scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full dark:scrollbar-thumb-gray-500 hover:dark:scrollbar-thumb-gray-400 active:dark:scrollbar-thumb-gray-400 flex gap-3 overflow-x-auto pb-1"
                onWheel={handleCardListWheel}
              >
                {board?.cards?.map((card: ICard) => (
                  <Card key={card?.id} card={card} />
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
