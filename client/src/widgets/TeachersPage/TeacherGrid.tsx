import type { Teacher } from "./types";
import TeacherCard from "./TeacherCard";
import { TeachersGrid } from "./styles";

interface Props {
  teachers: Teacher[];
  onSelect: (teacher: Teacher) => void;
}

const tutor: Teacher = {
  id: 0,
  name: "Наталия Ивкова",
  position: "Тьютор",
  department: "Администрация",
  avatar: "https://sun9-86.userapi.com/s/v1/ig2/rxsIWpHvncJ6dzlHr9FdOd8hNkMB7z_cwBWMlXytHgBNA4fRAQt1etk5_c0Pc5oSTxdIPp5dCvXJwugiUrXQMG1P.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x213,240x320,360x480,480x640,540x720,640x853,720x960,1080x1440,1280x1707,1440x1920,1920x2560&from=bu&u=Gymu_uZQ-SnFECEdEWl4llrxlaKnLZVO2XhPyPhg1Ps&cs=1920x0",
  studentsCount: 5000,
  experience: 5,
  tags: ["Наставничество", "Помощь", "Поддержка"],
  description: "Тьютор, который поможет со всеми вопросами",
  isTutor: true,
};


const TeacherGrid = ({ teachers, onSelect }: Props) => {
  return (
    <>
      <TeacherCard key={-1} teacher={tutor} onClick={() => window.location.href = "https://vk.com/natali_lisina"}
 />
      <TeachersGrid>
        {teachers.map((t) => (
          <TeacherCard key={t.id} teacher={t} onClick={onSelect} />
        ))}
      </TeachersGrid>
    </>
  );
};

export default TeacherGrid;
