// widgets/History/Timeline.tsx
import React from "react";
import styled from "styled-components";
import TimelineItem from "./TimelineItem";
import type { HistoryEntryData } from "../../pages/History";
import VUZ from "../../assets/ВУЗ.jpg";
import KS from "../../assets/КиберСпорт.jpg";

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
      text: " Раньше на месте современного корпуса на Ивановской, 24а, находились старые подсобные помещения и неработающая котельная... ",
      fullText: "Раньше на месте современного корпуса на Ивановской, 24а, находились старые подсобные помещения и неработающая котельная. Благодаря спонсорам здание полностью преобразили. Внутри теперь высокотехнологичные лаборатории, VR-оборудование и мощные серверы. Из заброшенного склада корпус превратился в современный ИТ-кампус. Сегодня это умное, светлое пространство, которое готово принимать студентов в свою большую семью.",
      image: VUZ,
      year: "2024",
      badges: ["Знаковое событие", "Основание"],
    },
    {
      id: "main-hall",
      icon: "🎓",
      title: "Киберспортивные мероприятия",
      text: "В Костромском государственном университете киберспорт стал не просто развлечением, а настоящей традицией. В «Высшей ИТ-школе»...",
      fullText: "В Костромском государственном университете киберспорт стал не просто развлечением, а настоящей традицией. В «Высшей ИТ-школе» регулярно проходят турниры, собирающие студентов и школьников региона. Один из последних — турнир по CS2, где 8 команд боролись за победу. Групповой этап прошёл онлайн, а финал состоялся очно в стенах университета. Победила сборная КГУ. Организаторы подготовили призы, комментаторскую зону, а в перерыве участников ждала традиционная «киберспортивная пицца». Мероприятие поддержал партнёр вуза — Совкомбанк. Такие турниры доказывают: в КГУ умеют сочетать учёбу, технологии и яркий студенческий досуг.",
      image: KS,
      overlay: true,
      year: "2024",
      badges: ["Выдающиеся личности", "Киберспорт", "Развлечения"],
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