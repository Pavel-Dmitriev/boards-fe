export function RoomsListPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-medium">
          <span className="gradient-text">Комнаты</span>
        </h1>
        <p className="text-neutral/70 text-lg">Выберите комнату для просмотра досок и карточек</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">Комнаты</div>
    </div>
  );
}
