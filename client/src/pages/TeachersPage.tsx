import { useState } from "react";
import { teachers } from "../widgets/TeachersPage/data";
import type { Teacher } from "../widgets/TeachersPage/types";
import TeacherGrid from "../widgets/TeachersPage/TeacherGrid";
import FilterBar from "../widgets/TeachersPage/FilterBar";
import TeacherDetail from "../widgets/TeachersPage/TeacherDetail";
import {
  PageContainer,
  PageTitle,
  PageSubtitle,
} from "../widgets/TeachersPage/styles";

const TeachersPage = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const departments = ["all", ...new Set(teachers.map((t) => t.department))];

  const filteredTeachers =
    activeFilter === "all"
      ? teachers
      : teachers.filter((t) => t.department === activeFilter);

  if (selectedTeacher) {
    return (
      <TeacherDetail
        teacher={selectedTeacher}
        onBack={() => setSelectedTeacher(null)}
      />
    );
  }

  return (
    <PageContainer>
      <PageTitle>Преподаватели</PageTitle>
      <PageSubtitle>
        {teachers.length} преподавателей готовы поделиться знаниями
      </PageSubtitle>

      <FilterBar
        departments={departments}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      <TeacherGrid teachers={filteredTeachers} onSelect={setSelectedTeacher} />
    </PageContainer>
  );
};

export default TeachersPage;
