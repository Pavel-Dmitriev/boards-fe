import binokl from "assets/binokl.avif";

/** Компонент показывает сообщение об отсутствии данных */
export function NoData() {
  return (
    <div className="mt-20 grid grid-rows-2 place-content-center justify-items-center">
      <img src={binokl} alt="бинокль" className="size-30" />
      <p className="text-xl text-gray-400">Нет данных</p>
    </div>
  );
}
