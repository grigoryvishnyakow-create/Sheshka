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
  const isTutor = teacher.isTutor === true;

  return (
    <Card onClick={() => !isTutor && onClick(teacher)}>
      <CardHeader>
        <Avatar src={teacher.avatar} />
        <CardInfo>
          <TeacherName>{teacher.name}</TeacherName>
          <TeacherPosition>{teacher.position}</TeacherPosition>
          <TeacherDepartment>{teacher.department}</TeacherDepartment>
        </CardInfo>
      </CardHeader>
      <Tags tags={teacher.tags} />

      {isTutor ? (
        <ViewButton
          as="a"
          href="https://vk.com/natali_lisina"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", display: "block", textAlign: "center" }}
        >
          Связаться
        </ViewButton>
      ) : (
        <ViewButton
          onClick={(e) => {
            e.stopPropagation();
            onClick(teacher);
          }}
        >
          Подробнее
        </ViewButton>
      )}
    </Card>
  );
};

export default TeacherCard;