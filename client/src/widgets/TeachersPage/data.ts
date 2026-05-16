import type { Teacher } from "./types";

export const teachers: Teacher[] = [
  {
    id: 1,
    name: "Алексей Иванов",
    position: "Доцент",
    department: "Кафедра информатики",
    avatar: "/avatars/ivanov.jpg",
    studentsCount: 120,
    experience: 10,
    tags: ["JavaScript", "TypeScript", "Web"],
    description:
      "Специализируется на веб-разработке и современных фронтенд-технологиях. Ведёт курсы по React и архитектуре приложений.",
  },
];
