import styled from "styled-components";
import HeroBalance from "../widgets/Dashboard/HeroBalance";
import DailyGoal from "../widgets/Dashboard/DailyGoal";
import QuestsSection from "../widgets/Dashboard/QuestsSection";

interface DashboardProps {
  balance: number;
}

const Wrapper = styled.div`
  padding: 80px 16px 100px;
  max-width: 1200px;
  margin: 0 auto;
`;

function Dashboard({ balance }: DashboardProps) {
  return (
    <Wrapper>
      <HeroBalance balance={balance} />
      <DailyGoal
        percent={75}
        hint="Выполните еще одно задание, чтобы достичь своей ежедневной цели!"
      />
      <QuestsSection />
    </Wrapper>
  );
}

export default Dashboard;
