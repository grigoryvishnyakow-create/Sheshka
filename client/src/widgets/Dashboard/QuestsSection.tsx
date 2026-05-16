import styled from "styled-components";
import QuestCard from "./QuestCard";
import SpecialQuestCard from "./SpecialQuestCard";

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

const SeeAll = styled.button`
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #075fab;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

function QuestsSection() {
  return (
    <Section>
      <Header>
        <Title>Активные квесты</Title>
        <SeeAll>См. Все</SeeAll>
      </Header>
      <Grid>
        <QuestCard
          icon="school"
          title="Узнай больше о своих преподавателях"
          description="Посетите страницу Преподаватели и ознакомьтесь с биографиями преподавателей, чтобы заработать баллы."
          points={50}
        />
        <QuestCard
          icon="account_balance"
          title="Изучите историю строительства"
          description="Отсканируйте QR-код, расположенный в главном холле корпуса Б."
          points={100}
          variant="tertiary"
        />
        <SpecialQuestCard />
      </Grid>
    </Section>
  );
}

export default QuestsSection;
