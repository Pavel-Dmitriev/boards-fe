import { FormProvider } from "react-hook-form";

import { Select, TextArea, TextInput } from "components/ui";

import { useControl } from "./useControl";

import { FormRules } from "shared/enum";

/**
 * Контент модалки создания карточки: комната, доска, заголовок и описание.
 *
 * @param onSuccess — колбэк после успешного создания
 */
export function CreateCardContent({ onSuccess }: { onSuccess: (roomId: string) => void }) {
  const {
    methods,
    register,
    watchRoom,
    roomOptions,
    boardOptions,
    isRoomsLoading,
    isBoardsLoading,
    handleRoomMenuOpen,
    handleBoardMenuOpen,
    onSubmit,
  } = useControl({ onSuccess });

  return (
    <FormProvider {...methods}>
      <form
        id="create-card-form"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-1"
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
      </form>
    </FormProvider>
  );
}
