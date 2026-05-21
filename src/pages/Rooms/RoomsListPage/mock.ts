import dayjs from "dayjs";

export const MOCK = [
  {
    id: "1",
    name: "Комплектующие ПК",
    description: "Какие комплектующие выбрать",
    boards: 12,
    createdAt: dayjs().format("DD.MM.YYYY"),
  },
  {
    id: "2",
    name: "Баги и проблемы",
    description: "Сообщения об ошибках и проблемах",
    boards: 8,
    createdAt: dayjs().format("DD.MM.YYYY"),
  },
  {
    id: "3",
    name: "Новые функции",
    description: "Предложения новых возможностей",
    boards: 24,
    createdAt: dayjs().format("DD.MM.YYYY"),
  },
  {
    id: "4",
    name: "Общие предложения",
    description: "Любые идеи по улучшению продукта",
    boards: 50,
    createdAt: dayjs().format("DD.MM.YYYY"),
  },
];
