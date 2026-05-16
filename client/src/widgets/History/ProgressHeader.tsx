import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  margin-bottom: 48px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #727782;
`;

const Badge = styled.span`
  background: #d4e3ff;
  color: #075fab;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 14px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 110, 29, 0.1);
  border-radius: 999px;
`;

const Progress = styled.div`
  height: 100%;
  width: 75%;
  background: #006e1d;
  border-radius: 999px;
`;

const ProgressHeader: React.FC = () => {
  return (
    <Wrapper>
      <Top>
        <div>
          <Title>Корпус Б</Title>
          <Subtitle>Тур «Архитектура и наследие»</Subtitle>
        </div>

        <Badge>75% Завершено</Badge>
      </Top>

      <ProgressBar>
        <Progress />
      </ProgressBar>
    </Wrapper>
  );
};

export default ProgressHeader;
