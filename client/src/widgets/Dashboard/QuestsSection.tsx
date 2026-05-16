import styled from "styled-components";
import QuestCard from "./QuestCard";
import SpecialQuestCard from "./SpecialQuestCard";
import type { TabId } from "../../app/App";

interface Props {
  onNavigate: (tab: TabId) => void;
}

const Section = styled.section``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #191c1e;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

function QuestsSection({ onNavigate }: Props) {
  return (
    <Section>
      <Header>
        <Title>Активные квесты</Title>
      </Header>

      <Grid>
        <QuestCard
          icon="school"
          title="Узнай больше о своих преподавателях"
          description="Посетите страницу Преподаватели..."
          points={50}
          onStart={() => onNavigate("teachers")}
        />

        <QuestCard
          icon="account_balance"
          title="Изучите историю строительства"
          description="Посетите страницу истории университета..."
          points={100}
          variant="tertiary"
          onStart={() => onNavigate("history")}
        />

        <SpecialQuestCard />
      </Grid>
    </Section>
  );
}

export default QuestsSection;
