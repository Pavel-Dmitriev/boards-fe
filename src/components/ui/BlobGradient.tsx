/** Компонент отображающий 3 заблюренные капли */
export function BlobGradient() {
  return (
    <>
      <div className="blob blob-purple -top-32 left-1/4 h-96 w-96" />
      <div className="blob blob-blue right-1/4 -bottom-32 h-96 w-96" />
      <div className="blob blob-pink top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2" />
    </>
  );
}
