import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useCardsStore } from "shared/stores";

import type { ICardModalProps } from "./interface";

export default function CardModal({ card }: ICardModalProps) {
  const { fetchComments } = useCardsStore();

  const methods = useForm();

  useEffect(() => {
    fetchComments(card.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-6">Контент</div>
    </FormProvider>
  );
}
