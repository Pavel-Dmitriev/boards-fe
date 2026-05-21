import { useNavigate } from "react-router";

import { MOCK } from "./mock";

export function RoomsListPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-medium">
          <span className="gradient-text">Комнаты</span>
        </h1>
        <p className="text-neutral/70 text-lg">Выберите комнату для просмотра досок и карточек</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK.map((it) => (
          <article key={it.id} className="card cursor-pointer" onClick={() => navigate(`${it.id}`)}>
            <div className="mb-2">
              <h2 className="text-xl font-medium">{it.name}</h2>
              <span className="text-neutral/70 align-top text-xs">{it.createdAt}</span>
            </div>
            <p className="text-neutral/70 mb-4 text-sm">{it.description}</p>
            <span className="badge text-xs">{it.boards} активных досок</span>
          </article>
        ))}
      </div>
    </>
  );
}
