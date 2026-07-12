import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CommentsSection from "./components/CommentsSection";
import { NoData, TextArea } from "components/ui";
import { useCardsStore } from "shared/stores";

import avatarPlaceholder from "assets/avatar.avif";

import { STATUS } from "shared/constants";

import type { ICardModalProps, IFormData } from "./interface";

/** Компонент модалки карточки */
export default function CardModal({ card }: ICardModalProps) {
  const { comments, fetchComments, createComment, isCommentsLoading } = useCardsStore();

  const status = STATUS[card.status];

  const methods = useForm<IFormData>({ defaultValues: { comment: "" } });
  const { register, handleSubmit, reset } = methods;

  /** Добавить комментарий */
  const onSubmit = ({ comment }: IFormData) => {
    createComment(card.id, comment);
    reset();
  };

  useEffect(() => {
    fetchComments(card.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id]);

  return (
    <FormProvider {...methods}>
      <div className="mx-1 mb-4 flex items-start justify-between gap-6 border-b border-gray-300 pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-5 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <img src={avatarPlaceholder} alt="" className="size-4.5 rounded-full object-cover" />
              <span>{card.owner.name}</span>
            </div>

            <span className="inline-block size-1 rounded-full bg-purple-700" />

            <span>{dayjs(card.createdAt).format("DD MMMM YYYY")}</span>

            <span className="inline-block size-1 rounded-full bg-purple-700" />

            <span
              className={clsx(
                "inline-block rounded-full px-3 py-0.5 text-xs font-medium",
                status?.className,
              )}
            >
              {status?.label}
            </span>
          </div>
        </div>
      </div>

      <section className="mx-1 mb-4 border-b border-gray-300 pb-4">
        <h3 className="mb-4 font-semibold">Описание</h3>

        {card.description ? (
          <p className="text-gray-700">{card.description}</p>
        ) : (
          <NoData label="Описание отсутствует" size="md" />
        )}
      </section>

      <CommentsSection comments={comments} isLoading={isCommentsLoading} />

      <form
        id="card-modal-form"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-1 max-w-[98.5%] [&>div]:px-1"
      >
        <TextArea
          {...register("comment")}
          label={{ children: "Добавить комментарий", hasWrapper: true }}
        />
      </form>
    </FormProvider>
  );
}
