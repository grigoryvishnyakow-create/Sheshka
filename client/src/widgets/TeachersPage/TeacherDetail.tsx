import type { Teacher } from "./types";
import {
  PageContainer,
  BackButton,
  ContactButton,
  HeroSection,
  HeroLeft,
  HeroAvatar,
  HeroName,
  HeroSubject,
  HeroRight,
  Badges,
  Badge,
  BioCard,
  BioTitle,
  BioText,
  ProgressWrapper,
  ProgressBar,
  ProgressFill,
} from "./styles";

interface Props {
  teacher: Teacher;
  onBack: () => void;
}

const TeacherDetail = ({ teacher, onBack }: Props) => {
  return (
    <PageContainer>
      {/* Назад */}
      <BackButton onClick={onBack}>← Назад</BackButton>

      {/* HERO SECTION */}
      <HeroSection>
        {/* LEFT */}
        <HeroLeft>
          <HeroAvatar src={teacher.avatar} alt={teacher.name} />
          <HeroName>{teacher.name}</HeroName>
          <HeroSubject>{teacher.position}</HeroSubject>
        </HeroLeft>

        {/* RIGHT */}
        <HeroRight>
          {/* BADGES */}
          <Badges>
            <Badge>
              <span className="material-symbols-outlined">verified_user</span>
              Top Rated
            </Badge>

            <Badge>
              <span className="material-symbols-outlined">school</span>
              PhD
            </Badge>

            <Badge>
              <span className="material-symbols-outlined">timer</span>
              {teacher.experience}+ лет опыта
            </Badge>
          </Badges>

          {/* BIO */}
          <BioCard>
            <BioTitle>О преподавателе</BioTitle>
            <BioText>{teacher.description}</BioText>
          </BioCard>
        </HeroRight>
      </HeroSection>

      {/* PROGRESS */}
      <ProgressWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 12, color: "#888" }}>Прогресс чтения</span>
          <span style={{ color: "#075fab", fontWeight: 600 }}>100%</span>
        </div>

        <ProgressBar>
          <ProgressFill />
        </ProgressBar>
      </ProgressWrapper>

      {/* CTA */}
      <ContactButton>Связаться</ContactButton>
    </PageContainer>
  );
};

export default TeacherDetail;
