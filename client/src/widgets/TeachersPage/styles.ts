import styled from "styled-components";

/* ===== Общие ===== */

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 48px;
  padding: 24px 16px 100px;
`;

export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const PageSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
`;

/* ===== Filters ===== */

export const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.active ? "#d4e3ff" : "#eee")};
`;

/* ===== Grid ===== */

export const TeachersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 15px
`;

/* ===== Card ===== */

export const TeacherCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  gap: 12px;
`;

export const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
`;

export const CardInfo = styled.div`
  flex: 1;
`;

export const TeacherName = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

export const TeacherPosition = styled.p`
  font-size: 14px;
  color: #075fab;
`;

export const TeacherDepartment = styled.p`
  font-size: 13px;
  color: #666;
`;

/* ===== Stats ===== */

export const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  margin: 12px 0;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StatIcon = styled.span`
  font-family: "Material Symbols Outlined";
  font-size: 18px;
`;

export const StatValue = styled.span`
  font-weight: 600;
`;

export const StatLabel = styled.span`
  font-size: 12px;
  color: #888;
`;

/* ===== Tags ===== */

export const TagsContainer = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const Tag = styled.span`
  background: #eee;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
`;

/* ===== Buttons ===== */

export const ViewButton = styled.button`
  width: 100%;
  padding: 8px;
  border-radius: 999px;
  border: none;
  background: #075fab;
  color: white;
  cursor: pointer;
`;

/* ===== Detail Page ===== */

export const BackButton = styled.button`
  margin-bottom: 16px;
  background: none;
  border: none;
  color: #075fab;
  cursor: pointer;
`;

export const DetailCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
`;

export const DetailHeader = styled.div`
  display: flex;
  gap: 16px;
`;

export const DetailAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 16px;
`;

export const DetailInfo = styled.div``;

export const DetailName = styled.h2`
  font-size: 22px;
`;

export const DetailPosition = styled.p`
  color: #075fab;
`;

export const DetailDepartment = styled.p`
  color: #666;
`;

export const DetailStats = styled.div`
  display: flex;
  gap: 20px;
  margin: 16px 0;
`;

export const DetailStat = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const DetailStatIcon = styled.span`
  font-family: "Material Symbols Outlined";
`;

export const DetailStatValue = styled.span`
  font-weight: bold;
`;

export const DetailStatLabel = styled.span`
  font-size: 12px;
`;

export const DetailSection = styled.div`
  margin-top: 16px;
`;

export const DetailSectionTitle = styled.h3`
  margin-bottom: 8px;
`;

export const DetailText = styled.p`
  color: #555;
`;

export const DetailTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const DetailTag = styled.span`
  background: #d4e3ff;
  padding: 4px 10px;
  border-radius: 999px;
`;

export const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
`;

export const ScheduleDay = styled.span``;

export const ScheduleTime = styled.span`
  color: #075fab;
`;

export const ContactButton = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 10px;
  border-radius: 999px;
  border: none;
  background: #075fab;
  color: white;
`;

export const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (min-width: 768px) {
    grid-template-columns: 320px 1fr;
  }
`;

export const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

export const HeroAvatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 16px;
  object-fit: cover;
  margin-bottom: 16px;
`;

export const HeroName = styled.h2`
  font-size: 28px;
  font-weight: 600;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const HeroSubject = styled.p`
  font-size: 18px;
  color: #075fab;
`;

export const HeroRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const Badges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  background: #d4e3ff;
  font-size: 12px;
`;
export const BioCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 16px;
`;

export const BioTitle = styled.h3`
  margin-bottom: 12px;
`;

export const BioText = styled.p`
  color: #555;
  line-height: 1.6;
`;
export const ProgressWrapper = styled.div`
  margin-top: 32px;
`;

export const ProgressBar = styled.div`
  height: 10px;
  background: #eee;
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  width: 100%;
  height: 100%;
  background: #4caf50;
`;
