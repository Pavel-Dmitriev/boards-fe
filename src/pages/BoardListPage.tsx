import { useNavigate } from "react-router-dom";

const mockBoards = [
  {
    id: "1",
    title: "Общие предложения",
    description: "Любые идеи по улучшению продукта",
    cards: 12,
  },
  { id: "2", title: "Баги и проблемы", description: "Сообщения об ошибках и проблемах", cards: 8 },
  { id: "3", title: "Новые функции", description: "Предложения новых возможностей", cards: 24 },
];

export function BoardListPage() {
  const navigate = useNavigate();

  /** Открыть доску по id  */
  const handleOpenBoard = (id: string) => {
    navigate(`/board/${id}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-medium">
          <span className="gradient-text">Доски обратной связи</span>
        </h1>
        <p className="text-neutral/70 text-lg">Выберите доску для просмотра и обсуждения</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockBoards.map((board) => (
          <article
            key={board.id}
            onClick={() => handleOpenBoard(board.id)}
            className="card cursor-pointer"
          >
            <h2 className="mb-2 text-xl font-medium">{board.title}</h2>
            <p className="text-neutral/70 mb-4 text-sm">{board.description}</p>
            <span className="badge text-xs">{board.cards} карточек</span>
          </article>
        ))}
      </div>
    </div>
  );
}
