import styled from "styled-components";

interface HeroBalanceProps {
  balance: number;
}

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  background: #075fab;
  border-radius: 32px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  color: #ffffff;
  margin-bottom: 24px;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  background-color: transparent;
  font-family: "Inter", sans-serif;
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  opacity: 0.9;
  margin-bottom: 4px;
  background-color: transparent;
`;

const Title = styled.h1`
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  background-color: transparent;
`;

const BlurTop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 256px;
  height: 256px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  margin: -80px -80px 0 0;
  filter: blur(48px);
`;

const BlurBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 128px;
  height: 128px;
  background: rgba(0, 110, 29, 0.2);
  border-radius: 50%;
  margin: 0 0 -40px -40px;
  filter: blur(32px);
`;

function HeroBalance({ balance }: HeroBalanceProps) {
  return (
    <Hero>
      <Content>
        <Label>Текущий баланс</Label>
        <Title>У вас {balance} шешей</Title>
      </Content>
      <BlurTop />
      <BlurBottom />
    </Hero>
  );
}

export default HeroBalance;
