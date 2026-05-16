import type { Teacher } from "./types";
import {
  TeacherCard as Card,
  CardHeader,
  Avatar,
  CardInfo,
  TeacherName,
  TeacherPosition,
  TeacherDepartment,
  ViewButton,
} from "./styles";
import Tags from "./Tags";

interface Props {
  teacher: Teacher;
  onClick: (teacher: Teacher) => void;
}

const TeacherCard = ({ teacher, onClick }: Props) => {
  return (
    <Card onClick={() => onClick(teacher)}>
      <CardHeader>
        <Avatar src={teacher.avatar} />
        <CardInfo>
          <TeacherName>{teacher.name}</TeacherName>
          <TeacherPosition>{teacher.position}</TeacherPosition>
          <TeacherDepartment>{teacher.department}</TeacherDepartment>
        </CardInfo>
      </CardHeader>
      <Tags tags={teacher.tags} />

      <ViewButton
        onClick={(e) => {
          e.stopPropagation();
          onClick(teacher);
        }}
      >
        Подробнее
      </ViewButton>
    </Card>
  );
};

export default TeacherCard;
