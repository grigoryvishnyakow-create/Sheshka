// Обновленный QuestsSection.tsx
import { useState, useEffect } from "react";
import styled from "styled-components";
import QuestCard from "./QuestCard";
import SpecialQuestCard from "./SpecialQuestCard";
import type { TabId } from "../../app/App";

interface Props {
  onNavigate: (tab: TabId) => void;
  studentId: number;
  onQuestComplete: () => void;
  onBalanceUpdate: (newBalance: number) => void;
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

function QuestsSection({
  onNavigate,
  studentId,
  onQuestComplete,
  onBalanceUpdate,
}: Props) {
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // ЗАГРУЗКА ВЫПОЛНЕННЫХ КВЕСТОВ
  useEffect(() => {
    const loadCompletedQuests = async () => {
      try {
        const response = await fetch(
          `/api/student/${studentId}/completed-quests`,
        );
        const data = await response.json();
        if (data.success) {
          const completedIds = data.completed_quests.map(
            (q: any) => q.quest_id,
          );
          setCompletedQuests(completedIds);
        }
      } catch (error) {
        console.error("Ошибка загрузки выполненных квестов:", error);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) {
      loadCompletedQuests();
    }
  }, [studentId]);

  const handleQuestComplete = async (points: number) => {
    // ОБНОВЛЯЕМ БАЛАНС В APP
    const response = await fetch(`/api/student/${studentId}/balance`);
    const data = await response.json();
    if (data.success) {
      onBalanceUpdate(data.points);
    }

    // ОБНОВЛЯЕМ ПРОГРЕСС ЕЖЕДНЕВНОЙ ЦЕЛИ
    onQuestComplete();
  };

  if (loading) {
    return <div>Загрузка квестов...</div>;
  }

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
          questId="teachers_quest"
          studentId={studentId}
          onComplete={handleQuestComplete}
          disabled={completedQuests.includes("teachers_quest")}
          onStart={() => onNavigate("teachers")}
        />

        <QuestCard
          icon="account_balance"
          title="Изучите историю строительства"
          description="Посетите страницу истории университета..."
          points={100}
          variant="tertiary"
          questId="history_quest"
          studentId={studentId}
          onComplete={handleQuestComplete}
          disabled={completedQuests.includes("history_quest")}
          onStart={() => onNavigate("history")}
        />

        <SpecialQuestCard />
      </Grid>
    </Section>
  );
}

export default QuestsSection;
