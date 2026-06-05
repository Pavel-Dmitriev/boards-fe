import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { useBoardsStore, useCardsStore, useRoomsStore } from "shared/stores";

import { DEFAULT_VALUES } from "./constants";

import type { IFormData } from "./interface";
import type { SelectOptionType } from "shared/types/SelectOptionType";

/**
 * Хук управления формой создания карточки.
 * Содержит всю логику: загрузку данных, сабмит, опции селектов.
 */
export function useControl() {
  const navigate = useNavigate();

  const { rooms, getRooms, isLoading: isRoomsLoading } = useRoomsStore();
  const { boards, getBoards, isLoading: isBoardsLoading } = useBoardsStore();
  const { createCard, isLoading } = useCardsStore();

  const methods = useForm<IFormData>({
    defaultValues: DEFAULT_VALUES,
  });
  const {
    register,
    reset,
    watch,
    formState: { isValid },
  } = methods;

  const watchRoom = watch("room");

  const handleRoomMenuOpen = async () => {
    if (rooms.length === 0) {
      await getRooms();
    }
  };

  const handleBoardMenuOpen = async () => {
    if (!watchRoom?.value) return;

    if (boards.length === 0) {
      await getBoards(String(watchRoom.value));
    }
  };

  const roomOptions: SelectOptionType[] = rooms.map((room) => ({
    value: room.id,
    label: room.name,
  }));

  const boardOptions: SelectOptionType[] = boards.map((board) => ({
    value: board.id,
    label: board.name,
  }));

  const onSubmit = async ({ title, description, board }: IFormData) => {
    await createCard(title, description, Number(board?.value));
    reset();
    navigate(`/rooms/${watchRoom?.value}`);
  };

  return {
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
  };
}
