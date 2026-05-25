import dayjs from "dayjs";

import type { IRoom } from "shared/interfaces";

export const MOCK: IRoom = {
  id: "1",
  name: "Комплектующие ПК",
  description: "Какие комплектующие выбрать",
  status: "active",
  type: "public",
  ownerId: "122dsd",
  createdAt: dayjs().format("DD.MM.YYYY"),
  boards: [
    {
      id: "1",
      title: "Видеокарты AMD/Nvidia",
      description: "Поиск лучшей видеокарты на рынке",
      created_at: dayjs().format("DD.MM.YYYY"),
      owner: {
        id: "pp11pp",
        name: "Всеволод Петров",
      },
      room_id: "1",
      cards: [
        {
          id: "1",
          title: "RTX 4060 vs RX 7600",
          description:
            "Какая видеокарта лучше для 1080p гейминга? Сравнение цен и производительности.",
          board_id: "1",
          category_id: null,
          author_id: "pp11pp",
          status: "new" as const,
          likes_count: 12,
          comments_count: 5,
          created_at: "01.02.2024",
          updated_at: "01.02.2024",
          isMember: true,
        },
        {
          id: "2",
          title: "RTX 4090 — стоит ли переплачивать?",
          description:
            "Обсуждение целесообразности покупки флагманской видеокарты для домашнего ПК.",
          board_id: "1",
          category_id: null,
          author_id: "pp22pp",
          status: "in_progress" as const,
          likes_count: 24,
          comments_count: 15,
          created_at: "28.01.2024",
          updated_at: "30.01.2024",
          isMember: true,
        },
        {
          id: "3",
          title: "Проблема с драйверами AMD",
          description:
            "После последнего обновления драйверов перестали запускаться некоторые игры.",
          board_id: "1",
          category_id: null,
          author_id: "pp33pp",
          status: "completed" as const,
          likes_count: 8,
          comments_count: 20,
          created_at: "15.01.2024",
          updated_at: "25.01.2024",
          isMember: false,
        },
        {
          id: "4",
          title: "RX 7800 XT — отзывы",
          description:
            "Кто уже тестировал новую карту от AMD? Интересует реальный опыт использования.",
          board_id: "1",
          category_id: null,
          author_id: "pp44pp",
          status: "rejected" as const,
          likes_count: 3,
          comments_count: 2,
          created_at: "05.01.2024",
          updated_at: "10.01.2024",
          isMember: true,
        },
      ],
    },
  ],
};
