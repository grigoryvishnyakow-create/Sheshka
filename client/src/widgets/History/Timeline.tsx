import React from "react";
import styled from "styled-components";
import TimelineItem from "./TimelineItem";
import type { HistoryEntryData } from "../../pages/History";

interface Props {
  onItemClick?: (entry: HistoryEntryData) => void;
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

const Timeline: React.FC<Props> = ({ onItemClick }) => {
  const entries: HistoryEntryData[] = [
    {
      id: "foundation",
      icon: "🏛",
      title: "Основание корпуса Б",
      text: "Краеугольный камень был заложен золотым осенним днём…",
      fullText:
        "Краеугольный камень корпуса Б был заложен золотым осенним днём 15 сентября 1890 года. На церемонии присутствовали выдающиеся деятели науки и культуры того времени. Архитектор Иван Петрович Соколов лично руководил закладкой первого камня, который, по традиции, содержал послание будущим поколениям. Строительство продолжалось три года, и за это время было использовано более двух миллионов кирпичей, произведённых на местном заводе.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAX_zMXgFb2ojkAJKcJtJa7qE4hrcie2BLUhcuQ19lJKIeFpms2zJipD6LpVuhNei1m38Q4o05uS95jY5b73lI-1OCILVfaC9JsyUq3viji0Z-0wZEZneqcoopOu8UtcC7FkN_PQcAT4__QPLMR5nZHKRgbfH7sJYr79dwjdcDRxfIGJSf-w69jvIv-81RVv7wCeW3ISb2cEHyUdUYOhvI-UUGTN1Quzzc1gpZZeXsv8lfi2xV_Uz_KxWLy-wwfoxvYyx_gFBG2t9fa",
      year: "1890",
      badges: ["Знаковое событие", "Основание"],
    },
    {
      id: "main-hall",
      icon: "🎓",
      title: "Главный хол",
      text: "Три лауреата Нобелевской премии ходили по этим коридорам...",
      fullText:
        "Главный хол университета помнит шаги трёх лауреатов Нобелевской премии: Петра Капицы, Льва Ландау и Николая Семёнова. Именно здесь, в стенах этого величественного зала, они проводили свои знаменитые семинары, на которые съезжались студенты со всей страны. Полы из итальянского мрамора и потолки высотой 12 метров создавали атмосферу величия науки и вдохновляли поколения исследователей на великие открытия.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDdyhlj8pmq01JiQ6Sghj-AspQC0rrpXq4KYN5mN7zIB7kTTgixHUGyutvNAuntj6V45mGQAl1WMI8DmFL8fK30oG9AkfPUeHUoUSbsu6ydEY5VGma45bxBvK7ZwmUlQIFaJDhb5TV1z-3xVSLKtbGWIzeYCUsonBbTHN6Ll1dO175Mcbg1FM8mTcRsh4vyVT4FrdPnbHy0whXIbFouMZuAHIUmAFFoSx5Me-bl6oC7h05ofgyVUGJkTWhisZ3CZxq-drQyoIvXKTyN",
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
          />
        </div>
      ))}
    </Wrapper>
  );
};

export default Timeline;
