import type { Teacher } from "./types";
import TeacherCard from "./TeacherCard";
import { TeachersGrid } from "./styles";

interface Props {
  teachers: Teacher[];
  onSelect: (teacher: Teacher) => void;
}

const TeacherGrid = ({ teachers, onSelect }: Props) => {
  return (
    <TeachersGrid>
      {teachers.map((t) => (
        <TeacherCard key={t.id} teacher={t} onClick={onSelect} />
      ))}
    </TeachersGrid>
  );
};

export default TeacherGrid;
