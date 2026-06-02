import isNil from "lodash-es/isNil";
import size from "lodash-es/size";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Board, EditBoardForm } from "./components";
import { NoData, TextArea, TextInput } from "components/ui";
import { Button } from "components/ui/Button";
import { useModalStore } from "components/ui/Modal/store";
import { useBoardsStore, useRoomsStore } from "shared/stores";

import { DEFAULT_VALUES } from "./constants";
import { FormRules } from "shared/enum";

import type { IModalConfig } from "components/ui/Modal/store/interface";

/** Страница подробной информации о комнате */
export function RoomsDetailPage() {
  const { id } = useParams();

  const methods = useForm({
    defaultValues: DEFAULT_VALUES,
  });
  const { register, handleSubmit, reset } = methods;

  const { room, getRoom } = useRoomsStore();

  const { boards, getBoards, deleteBoard, toggleLike } = useBoardsStore();
  const { open, close } = useModalStore();

  const handleCloseModal = () => {
    close();
    reset();
  };

  const handleEditBoard = (boardId: string, name: string, description: string) => {
    open({
      title: "Редактировать доску",
      wrapper: (content) => <FormProvider {...methods}>{content}</FormProvider>,
      children: (
        <EditBoardForm
          key={boardId}
          boardId={boardId}
          title={name}
          description={description}
          onClose={handleCloseModal}
        />
      ),
      buttons: (
        <>
          <Button type="button" kind="secondary" onClick={handleCloseModal}>
            Отмена
          </Button>
          <Button type="submit" form="edit-board-form">
            Сохранить
          </Button>
        </>
      ),
    });
  };

  const handleDeleteBoard = (boardId: string) => {
    open({
      title: "Удалить доску",
      children: <p>Вы уверены, что хотите удалить доску?</p>,
      buttons: (
        <>
          <Button type="button" kind="secondary" onClick={close}>
            Отмена
          </Button>
          <Button
            type="button"
            onClick={() => {
              deleteBoard(boardId);
              close();
            }}
          >
            Удалить
          </Button>
        </>
      ),
    });
  };

  const handleToggleLike = (cardId: string) => {
    toggleLike(cardId);
  };

  const createModalConfig: IModalConfig = {
    title: "Создать доску",
    wrapper: (content) => <FormProvider {...methods}>{content}</FormProvider>,
    children: (
      <form
        id="board-form"
        onSubmit={handleSubmit((data) => {
          console.log("data:", data);
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

  useEffect(() => {
    if (id) {
      getRoom(id);
    }
  }, []);

  useEffect(() => {
    if (id && !isNil(room)) {
      getBoards(id);
    }
  }, [room]);

  return (
    <>
      <div className="mb-12 grid grid-cols-2 items-center justify-items-start gap-x-6 text-center">
        <div>
          <h1 className="mb-3 text-4xl font-medium">
            <span className="gradient-text">{room?.name}</span>
          </h1>
          {room?.description && (
            <p className="text-neutral/70 text-left text-lg">{room?.description}</p>
          )}
        </div>
        <div className="justify-self-end" onClick={() => open(createModalConfig)}>
          <Button>Создать доску</Button>
        </div>
      </div>

      {size(boards) > 0 ? (
        <div>
          {boards?.map((board) => (
            <Board
              key={`board_${board?.id}`}
              {...board}
              onEditBoard={() => handleEditBoard(board.id, board.name, board.description)}
              onDeleteBoard={() => handleDeleteBoard(board.id)}
              onLikeCard={handleToggleLike}
            />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
