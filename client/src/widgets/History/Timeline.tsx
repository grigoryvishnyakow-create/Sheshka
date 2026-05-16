import React from "react";
import styled from "styled-components";
import TimelineItem from "./TimelineItem";

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

const Timeline: React.FC = () => {
  return (
    <Wrapper>
      <Line />

      <TimelineItem
        icon="🏛"
        title="Основание корпуса Б"
        text="Краеугольный камень был заложен золотым осенним днём…"
        image="https://lh3.googleusercontent.com/aida-public/AB6AXuAX_zMXgFb2ojkAJKcJtJa7qE4hrcie2BLUhcuQ19lJKIeFpms2zJipD6LpVuhNei1m38Q4o05uS95jY5b73lI-1OCILVfaC9JsyUq3viji0Z-0wZEZneqcoopOu8UtcC7FkN_PQcAT4__QPLMR5nZHKRgbfH7sJYr79dwjdcDRxfIGJSf-w69jvIv-81RVv7wCeW3ISb2cEHyUdUYOhvI-UUGTN1Quzzc1gpZZeXsv8lfi2xV_Uz_KxWLy-wwfoxvYyx_gFBG2t9fa"
        year="1890"
      />

      <TimelineItem
        icon="🎓"
        title="Главный хол"
        text="Три лауреата Нобелевской премии ходили по этим коридорам..."
        image="https://lh3.googleusercontent.com/aida-public/AB6AXuDdyhlj8pmq01JiQ6Sghj-AspQC0rrpXq4KYN5mN7zIB7kTTgixHUGyutvNAuntj6V45mGQAl1WMI8DmFL8fK30oG9AkfPUeHUoUSbsu6ydEY5VGma45bxBvK7ZwmUlQIFaJDhb5TV1z-3xVSLKtbGWIzeYCUsonBbTHN6Ll1dO175Mcbg1FM8mTcRsh4vyVT4FrdPnbHy0whXIbFouMZuAHIUmAFFoSx5Me-bl6oC7h05ofgyVUGJkTWhisZ3CZxq-drQyoIvXKTyN"
        overlay
      />

      <TimelineItem
        icon="🔒"
        title="Закрытый контент"
        text="Будет позже..."
        locked
      />
    </Wrapper>
  );
};

export default Timeline;
