// pages/History.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProgressHeader from "../widgets/History/ProgressHeader";
import Timeline from "../widgets/History/Timeline";
import HistoryDetail from "../widgets/History/HistoryDetail";

export interface HistoryEntryData {
  id: string;
  icon: string;
  title: string;
  text: string;
  fullText?: string;
  image?: string;
  year?: string;
  overlay?: boolean;
  locked?: boolean;
  badges?: string[];
}

const Container = styled.main`
  padding: 80px 16px 120px;
  max-width: 1200px;
  margin: 0 auto;
`;

interface HistoryPageProps {
  studentId: number;
  onBalanceUpdate?: (newBalance: number) => void;
  onProgressUpdate?: (percent: number) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ 
  studentId, 
  onBalanceUpdate,
  onProgressUpdate 
}) => {
  const [selectedHistory, setSelectedHistory] = useState<HistoryEntryData | null>(null);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [progressPercent, setProgressPercent] = useState(0);

  // ЗАГРУЖАЕМ СПИСОК ВЫПОЛНЕННЫХ КВЕСТОВ ПРИ ЗАГРУЗКЕ
  useEffect(() => {
    const loadCompletedQuests = async () => {
      try {
        const response = await fetch(`/api/student/${studentId}/completed-quests`);
        const data = await response.json();
        
        if (data.success) {
          const questIds = data.completed_quests.map((q: any) => q.quest_id);
          setCompletedQuests(questIds);
          
          // ТОЛЬКО КВЕСТЫ, ОТНОСЯЩИЕСЯ К ИСТОРИИ
          const historyQuestIds = ["foundation", "main-hall"];
          const completedHistoryQuests = questIds.filter((id: string) => 
            historyQuestIds.includes(id)
          );
          
          const totalQuests = historyQuestIds.length;
          const percent = Math.round((completedHistoryQuests.length / totalQuests) * 100);
          setProgressPercent(Math.min(100, percent));
          onProgressUpdate?.(Math.min(100, percent));
        }
      } catch (error) {
        console.error("Ошибка загрузки выполненных квестов:", error);
      }
    };
    
    if (studentId) {
      loadCompletedQuests();
    }
  }, [studentId]);

  const handleHistoryClick = (entry: HistoryEntryData) => {
    if (!entry.locked) {
      setSelectedHistory(entry);
    }
  };

  const handleBack = () => {
    setSelectedHistory(null);
  };

  const handlePointsEarned = async (_points: number, newBalance: number) => {
    
    const response = await fetch(`/api/student/${studentId}/completed-quests`);
    const data = await response.json();
    
    if (data.success) {
      const questIds = data.completed_quests.map((q: any) => q.quest_id);
      setCompletedQuests(questIds);
      
      // ТОЛЬКО КВЕСТЫ ИСТОРИИ
      const historyQuestIds = ["foundation", "main-hall"];
      const completedHistoryQuests = questIds.filter((id: string) => 
        historyQuestIds.includes(id)
      );
      
      const totalQuests = historyQuestIds.length;
      const percent = Math.round((completedHistoryQuests.length / totalQuests) * 100);
      setProgressPercent(Math.min(100, percent));
      onProgressUpdate?.(Math.min(100, percent));
    }
    
    onBalanceUpdate?.(newBalance);
  };

  // Если выбрана конкретная история — показываем детальную страницу
  if (selectedHistory) {
    return (
      <Container>
        <HistoryDetail 
          entry={selectedHistory} 
          studentId={studentId}
          onBack={handleBack}
          onPointsEarned={handlePointsEarned}
        />
      </Container>
    );
  }

  // Иначе показываем список с таймлайном
  return (
    <Container>
      <ProgressHeader progressPercent={progressPercent} />
      <Timeline 
        onItemClick={handleHistoryClick} 
        completedQuests={completedQuests}
      />
    </Container>
  );
};

export default HistoryPage;
