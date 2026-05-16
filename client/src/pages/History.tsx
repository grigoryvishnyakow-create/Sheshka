import React, { useState } from "react";
import styled from "styled-components";
import ProgressHeader from "../widgets/History/ProgressHeader";
import Timeline from "../widgets/History/Timeline";
import HistoryDetail from "../widgets/History/HistoryDetail";

const Container = styled.main`
  padding: 80px 16px 120px;
  max-width: 1200px;
  margin: 0 auto;
`;

// Тип для элемента истории
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

const HistoryPage: React.FC = () => {
  const [selectedHistory, setSelectedHistory] =
    useState<HistoryEntryData | null>(null);

  const handleHistoryClick = (entry: HistoryEntryData) => {
    if (!entry.locked) {
      setSelectedHistory(entry);
    }
  };

  const handleBack = () => {
    setSelectedHistory(null);
  };

  // Если выбрана конкретная история — показываем детальную страницу
  if (selectedHistory) {
    return (
      <Container>
        <HistoryDetail entry={selectedHistory} onBack={handleBack} />
      </Container>
    );
  }

  // Иначе показываем список с таймлайном
  return (
    <Container>
      <ProgressHeader />
      <Timeline onItemClick={handleHistoryClick} />
    </Container>
  );
};

export default HistoryPage;
