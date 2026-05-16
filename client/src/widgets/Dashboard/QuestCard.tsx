import styled from "styled-components";

interface QuestCardProps {
  icon: string;
  title: string;
  description: string;
  points: number;
  variant?: "primary" | "tertiary";
}

const Card = styled.div`
  background-color: #fff;
  font-family: "Inter", sans-serif;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background-color: transparent;
`;

const IconBox = styled.div<{ $variant: "primary" | "tertiary" }>`
  width: 56px;
  height: 56px;
  background: ${({ $variant }) =>
    $variant === "tertiary"
      ? "rgba(255, 223, 153, 0.3)"
      : "rgba(7, 95, 171, 0.1)"};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Icon = styled.span.attrs<{ $variant: "primary" | "tertiary" }>(() => ({
  className: "material-symbols-outlined",
}))<{ $variant: "primary" | "tertiary" }>`
  font-size: 32px;
  color: ${({ $variant }) => ($variant === "tertiary" ? "#775a00" : "#075fab")};
  background-color: transparent;
`;

const Content = styled.div`
  flex-grow: 1;
  background-color: transparent;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #191c1e;
  margin-bottom: 4px;
  background-color: transparent;
`;

const Description = styled.p`
  font-size: 14px;
  color: #414751;
  margin-bottom: 24px;
  background-color: transparent;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: rgba(121, 220, 120, 0.3);
  border-radius: 999px;
`;

const PointsIcon = styled.span.attrs({
  className: "material-symbols-outlined",
})`
  font-size: 16px;
  color: #005314;
  font-variation-settings: "FILL" 1;
  background-color: transparent;
`;

const Points = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #005314;
  background-color: transparent;
`;

const Button = styled.button`
  background: #075fab;
  color: #ffffff;
  padding: 8px 24px;
  border-radius: 999px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

function QuestCard({
  icon,
  title,
  description,
  points,
  variant = "primary",
}: QuestCardProps) {
  return (
    <Card>
      <Inner>
        <IconBox $variant={variant}>
          <Icon $variant={variant}>{icon}</Icon>
        </IconBox>
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Footer>
            <Badge>
              <PointsIcon>eco</PointsIcon>
              <Points>+{points} баллов</Points>
            </Badge>
            <Button>Начать</Button>
          </Footer>
        </Content>
      </Inner>
    </Card>
  );
}

export default QuestCard;
