import { MOCK } from "./mock";

export function RoomsDetailPage() {
  return (
    <>
      <h1 className="text-primary mb-3 text-3xl font-medium">{MOCK?.name}</h1>
      <p className="text-neutral/70">{MOCK?.description}</p>
      {MOCK?.boards.map((it) => (
        <article className="" key={`board_${it.id}`}>
          <h3>{it?.title}</h3>
          <p>{it?.description}</p>
          <div>
            <p>Кем создана: {it?.owner?.name}</p>
          </div>
          <span className="badge text-xs">{it.cards?.length} активных карточек</span>
        </article>
      ))}
    </>
  );
}
