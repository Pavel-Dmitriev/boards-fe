import { useForm } from "react-hook-form";

import Card from "components/Card";
import { Button } from "components/ui/Button";
import { useModal } from "components/ui/Modal";

import { DEFALT_VALUES } from "./constants";
import { MOCK } from "./mock";

export function RoomsDetailPage() {
  const { name, description, boards } = MOCK;

  const methods = useForm({
    defaultValues: DEFALT_VALUES,
  });

  const { register, handleSubmit, reset } = methods;

  const handleSubmitForm = (data: any) => {
    console.log("data:", data);
    // TODO: Здесь можно добавить логику для отправки данных на сервер или обновления состояния
  };

  const handleCloseModal = () => {
    close();
    reset();
  };

  const modalConfig = {
    title: "Создать доску",
    children: (
      <form className="grid gap-4" onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
        <input
          className="input"
          {...register("title", { required: true })}
          name="title"
          placeholder="Введите название доски"
          required
        />
        <textarea
          className="input"
          {...register("description")}
          name="description"
          placeholder="Введите описание доски"
        />
      </form>
    ),
    buttons: (
      <>
        <Button type="button" kind="secondary" onClick={handleCloseModal}>
          Отмена
        </Button>
        <Button type="submit" onClick={handleSubmit((data) => handleSubmitForm(data))}>
          Создать
        </Button>
      </>
    ),
  };

  const { open, close } = useModal(modalConfig);

  return (
    <>
      <div className="mb-12 grid grid-cols-2 items-center justify-items-start gap-x-6 text-center">
        <div>
          <h1 className="mb-3 text-4xl font-medium">
            <span className="gradient-text">{name}</span>
          </h1>
          {description && <p className="text-neutral/70 text-left text-lg">{description}</p>}
        </div>
        <div className="justify-self-end" onClick={() => open()}>
          <Button>Создать доску</Button>
        </div>
      </div>

      {boards?.length === 0 ? (
        <p className="text-neutral/70 text-center">В этой комнате пока нет досок</p>
      ) : (
        <div className="">
          {boards?.map((board) => (
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
              <div className="flex gap-3 overflow-x-auto">
                {board?.cards?.map((it) => (
                  <Card key={it?.id} card={it} />
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
