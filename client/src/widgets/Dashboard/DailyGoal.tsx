import styled from "styled-components";

interface DailyGoalProps {
  percent: number;
  hint: string;
}

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  margin-bottom: 48px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  background-color: transparent;
`;

const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #191c1e;
  background-color: transparent;
`;

const Percent = styled.span`
  font-family: "Inter", sans-serif;
  background-color: transparent;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #006e1d;
`;

const Bar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(0, 110, 29, 0.1);
  border-radius: 999px;
  overflow: hidden;
`;

const Fill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: #006e1d;
  border-radius: 999px;
`;

const Hint = styled.p`
  font-size: 14px;
  color: #414751;
  margin-top: 12px;
  font-family: "Inter", sans-serif;
  background-color: transparent;
`;

function DailyGoal({ percent, hint }: DailyGoalProps) {
  return (
    <Card>
      <Header>
        <Title>Ежедневная цель</Title>
        <Percent>{percent}% Выполнено</Percent>
      </Header>
      <Bar>
        <Fill $percent={percent} />
      </Bar>
      <Hint>{hint}</Hint>
    </Card>
  );
}

export default DailyGoal;
