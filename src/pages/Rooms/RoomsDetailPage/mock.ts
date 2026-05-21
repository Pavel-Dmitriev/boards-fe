import dayjs from "dayjs";

export const MOCK = {
  id: "1",
  name: "Комплектующие ПК",
  description: "Какие комплектующие выбрать",
  status: "active",
  boards: [
    {
      id: 1,
      title: "Видеокарты AMD/Nvidia",
      description: "Поиск лучшей видеокарты на рынке",
      created_at: dayjs().format("DD.MM.YYYY"),
      owner: {
        id: "pp11pp",
        name: "Всеволод Петров",
      },
      room_id: "1",
      owner_id: "1",
      cards: [
        { id: 1, name: "card1" },
        { id: 2, name: "card2" },
        { id: 3, name: "card3" },
      ],
    },
  ],
};
