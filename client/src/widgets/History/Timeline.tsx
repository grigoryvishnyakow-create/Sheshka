// widgets/History/Timeline.tsx
import React from "react";
import styled from "styled-components";
import TimelineItem from "./TimelineItem";
import type { HistoryEntryData } from "../../pages/History";

interface Props {
  onItemClick?: (entry: HistoryEntryData) => void;
  completedQuests?: string[];
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Line = styled.div`
  position: absolute;
  left: 24px;
  top: 32px;
  bottom: 32px;
  width: 2px;
  background: #e0e3e6;
`;

const Timeline: React.FC<Props> = ({ onItemClick, completedQuests = [] }) => {
  const entries: HistoryEntryData[] = [
    {
      id: "foundation",
      icon: "🏛",
      title: "Основание корпуса Б",
      text: "Краеугольный камень был заложен золотым осенним днём…",
      fullText: "...",
      image: "https://...",
      year: "1890",
      badges: ["Знаковое событие", "Основание"],
    },
    {
      id: "main-hall",
      icon: "🎓",
      title: "Главный хол",
      text: "Три лауреата Нобелевской премии ходили по этим коридорам...",
      fullText: "...",
      image: "https://...",
      overlay: true,
      badges: ["Выдающиеся личности", "Наука"],
    },
    {
      id: "locked-content",
      icon: "🔒",
      title: "Закрытый контент",
      text: "Будет позже...",
      locked: true,
    },
  ];

  const handleClick = (entry: HistoryEntryData) => {
    if (onItemClick && !entry.locked) {
      onItemClick(entry);
    }
  };

  return (
    <Wrapper>
      <Line />
      {entries.map((entry) => (
        <div
          key={entry.id}
          onClick={() => handleClick(entry)}
          style={{ cursor: entry.locked ? "default" : "pointer" }}
        >
          <TimelineItem
            icon={entry.icon}
            title={entry.title}
            text={entry.text}
            image={entry.image}
            year={entry.year}
            overlay={entry.overlay}
            locked={entry.locked}
            isCompleted={completedQuests.includes(entry.id)}
          />
        </div>
      ))}
    </Wrapper>
  );
};

export default Timeline;