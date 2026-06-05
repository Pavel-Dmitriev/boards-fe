import { FormProvider } from "react-hook-form";

import { Button, Select, TextArea, TextInput } from "components/ui";

import { useControl } from "./useControl";

import { FormRules } from "shared/enum";

/** Страница создания карточки */
export function CreateCardPage() {
  const {
    methods,
    register,
    isValid,
    watchRoom,
    roomOptions,
    boardOptions,
    isRoomsLoading,
    isBoardsLoading,
    isLoading,
    handleRoomMenuOpen,
    handleBoardMenuOpen,
    onSubmit,
  } = useControl();

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-3xl font-medium">Создать карточку</h1>

      <FormProvider {...methods}>
        <form
          id="create-card-form"
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex max-w-md flex-col gap-4"
        >
          <Select
            name="room"
            label={{ children: "Комната", required: true, hasWrapper: true }}
            options={roomOptions}
            rules={{ required: FormRules.required }}
            onMenuOpen={handleRoomMenuOpen}
            placeholder="Выберите комнату"
            isLoading={isRoomsLoading}
            required
          />

          <Select
            name="board"
            label={{ children: "Доска", required: true, hasWrapper: true }}
            options={boardOptions}
            rules={{ required: FormRules.required }}
            onMenuOpen={handleBoardMenuOpen}
            placeholder="Выберите доску"
            isDisabled={!watchRoom}
            isLoading={isBoardsLoading}
            required
          />

          <TextInput
            {...register("title", { required: FormRules.required })}
            label={{ children: "Заголовок", required: true, hasWrapper: true }}
            placeholder="Введите заголовок карточки"
          />

          <TextArea
            {...register("description")}
            placeholder="Введите описание"
            label={{ children: "Описание", hasWrapper: true }}
            rows={3}
          />

          <Button type="submit" isLoading={isLoading} disabled={!isValid}>
            Создать
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
