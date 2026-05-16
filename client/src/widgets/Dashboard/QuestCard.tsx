// Обновленный QuestCard.tsx
import styled from "styled-components";
import { useState } from "react";

interface QuestCardProps {
  icon: string;
  title: string;
  description: string;
  points: number;
  questId: string; // НОВЫЙ ПРОПС
  variant?: "primary" | "tertiary";
  onStart?: () => void;
  studentId?: number; // НОВЫЙ ПРОПС
  onComplete?: (points: number) => void; // НОВЫЙ ПРОПС
  disabled?: boolean; // НОВЫЙ ПРОПС ДЛЯ ВЫПОЛНЕННЫХ КВЕСТОВ
}

const Card = styled.div<{ $disabled?: boolean }>`
  background-color: #fff;
  font-family: "Inter", sans-serif;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};

  &:hover {
    transform: ${({ $disabled }) => ($disabled ? "none" : "translateY(-4px)")};
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
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

const Icon = styled.span.attrs({
  className: "material-symbols-outlined",
})<{ $variant: "primary" | "tertiary" }>`
  font-size: 32px;
  color: ${({ $variant }) => ($variant === "tertiary" ? "#775a00" : "#075fab")};
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #191c1e;
  margin-bottom: 4px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #414751;
  margin-bottom: 24px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
`;

const Points = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #005314;
`;

const Button = styled.button<{ $completed?: boolean }>`
  background: ${({ $completed }) => ($completed ? "#006e1d" : "#075fab")};
  color: #ffffff;
  padding: 8px 24px;
  border-radius: 999px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: ${({ $completed }) => ($completed ? "default" : "pointer")};

  &:hover {
    opacity: ${({ $completed }) => ($completed ? 1 : 0.9)};
  }
`;

function QuestCard({
  icon,
  title,
  description,
  points,
  questId,
  variant = "primary",
  onStart,
  studentId,
  onComplete,
  disabled = false,
}: QuestCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleClick = async () => {
    if (disabled || completed || !studentId || !onComplete) return;

    setIsCompleting(true);
    try {
      const response = await fetch(`/api/student/${studentId}/complete-quest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quest_id: questId,
          points: points,
          quest_title: title,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCompleted(true);
        onComplete(points);
        if (onStart) onStart();
      } else {
        alert(data.message || "Ошибка при выполнении квеста");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка соединения с сервером");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Card $disabled={disabled || completed}>
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
              <Points>+{points} шешей</Points>
            </Badge>

            <Button
              onClick={handleClick}
              disabled={disabled || completed || isCompleting}
              $completed={completed}
            >
              {isCompleting
                ? "Выполняется..."
                : completed
                  ? "Выполнено ✓"
                  : "Начать"}
            </Button>
          </Footer>
        </Content>
      </Inner>
    </Card>
  );
}

export default QuestCard;
