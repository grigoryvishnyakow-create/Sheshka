// Обновленный Dashboard.tsx
import { useState, useEffect } from "react";
import styled from "styled-components";
import HeroBalance from "../widgets/Dashboard/HeroBalance";
import DailyGoal from "../widgets/Dashboard/DailyGoal";
import QuestsSection from "../widgets/Dashboard/QuestsSection";
import type { TabId } from "../app/App";
import { api } from "../services/api";

interface DashboardProps {
  balance: number;
  studentId: number; // НОВЫЙ ПРОПС
  onNavigate: (tab: TabId) => void;
  onBalanceUpdate: (newBalance: number) => void; // НОВЫЙ ПРОПС ДЛЯ ОБНОВЛЕНИЯ БАЛАНСА
}

const Wrapper = styled.div`
  padding: 80px 16px 100px;
  max-width: 1200px;
  margin: 0 auto;
`;

function Dashboard({
  balance,
  studentId,
  onNavigate,
  onBalanceUpdate,
}: DashboardProps) {
  const [dailyProgress, setDailyProgress] = useState({
    percent: 0,
    completed_today: 0,
    target: 3,
    remaining: 3,
  });
  const [loading, setLoading] = useState(true);

  // ЗАГРУЗКА ПРОГРЕССА ПРИ МОНТИРОВАНИИ
  const loadDailyProgress = async () => {
    try {
      const data = await api.getDailyProgress(studentId);
      if (data.success) {
        setDailyProgress(data.daily_progress);
      }
    } catch (error) {
      console.error("Ошибка загрузки прогресса:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      loadDailyProgress();
    }
  }, [studentId]);

  // ФУНКЦИЯ ДЛЯ ОБНОВЛЕНИЯ ПОСЛЕ ВЫПОЛНЕНИЯ КВЕСТА
  const handleQuestComplete = async () => {
    await loadDailyProgress(); // ПЕРЕЗАГРУЖАЕМ ПРОГРЕСС
  };

  // ФОРМИРУЕМ ПОДСКАЗКУ НА ОСНОВЕ ПРОГРЕССА
  const getHint = () => {
    if (dailyProgress.remaining === 0) {
      return "🎉 Отлично! Вы выполнили дневную норму! Завтра новые задания.";
    }
    return `Выполните еще ${dailyProgress.remaining} задание(й), чтобы достичь своей ежедневной цели!`;
  };

  if (loading) {
    return <Wrapper>Загрузка...</Wrapper>;
  }

  return (
    <Wrapper>
      <HeroBalance balance={balance} />

      <DailyGoal percent={dailyProgress.percent} hint={getHint()} />

      <QuestsSection
        onNavigate={onNavigate}
        studentId={studentId}
        onQuestComplete={handleQuestComplete}
        onBalanceUpdate={onBalanceUpdate}
      />
    </Wrapper>
  );
}

export default Dashboard;
