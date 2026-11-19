import { type SubmitEvent, useState } from "react";

import { Button, TextArea } from "components/ui";

/**
 * Пропсы формы ответа на комментарий
 * @property onSubmit - отправить текст ответа
 * @property onCancel - закрыть форму
 */
interface IReplyFormProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

/** Форма ответа на комментарий */
export default function ReplyForm({ onSubmit, onCancel }: IReplyFormProps) {
  const [reply, setReply] = useState("");

  /** Отправить ответ */
  const handleReplySubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const content = reply.trim();
    if (!content) return;

    onSubmit(content);
    setReply("");
  };

  return (
    <form onSubmit={handleReplySubmit} className="mt-3 space-y-3">
      <TextArea
        name="reply"
        value={reply}
        onChange={(event) => setReply(event.target.value)}
        autoFocus
        label={{
          children: "Ваш ответ",
          hasWrapper: true,
        }}
        placeholder="Введите ответ"
        className="px-1"
      />

      <div className="flex items-center gap-2">
        <Button type="submit" size="sm">
          Отправить
        </Button>
        <Button type="button" kind="secondary" size="sm" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
}
