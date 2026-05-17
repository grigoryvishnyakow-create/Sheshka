export interface Teacher {
  id: number;
  name: string;
  position: string;
  department: string;
  avatar: string;
  studentsCount: number;
  experience: number;
  tags: string[];
  description: string;
  isTutor?: boolean;
  // Новые поля
  comicImage?: string;  // URL картинки комикса
  quiz?: {              // Данные теста
    question: string;
    options: string[];
    correctIndex: number;
  };
}