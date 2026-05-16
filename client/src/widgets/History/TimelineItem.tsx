import React from "react";
import styled from "styled-components";

interface Props {
  icon: string;
  title: string;
  text: string;
  image?: string;
  year?: string;
  overlay?: boolean;
  locked?: boolean;
  isCompleted?: boolean;
}

const Row = styled.div`
  display: flex;
  gap: 24px;
`;

const Icon = styled.div<{ $completed?: boolean }>`
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ $completed }) => ($completed ? "#006e1d" : "#075fab")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
`;

const Card = styled.div`
  flex: 1;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.div<{ src: string }>`
  height: 180px;
  border-radius: 12px;
  margin-bottom: 16px;
  background: url(${(p) => p.src}) center/cover;
  position: relative;
`;

const Year = styled.span`
  position: absolute;
  bottom: 12px;
  left: 12px;
  color: white;
  font-weight: bold;
`;

const CompletedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #006e1d;
  color: white;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  
  span {
    font-size: 14px;
  }
`;

const Locked = styled.div`
  text-align: center;
  padding: 40px;
  color: #727782;
`;

const Title = styled.h3`
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 600;
`;

const Text = styled.p`
  color: #727782;
  font-size: 14px;
`;

const TimelineItem: React.FC<Props> = ({
  icon,
  title,
  text,
  image,
  year,
  locked,
  isCompleted,
}) => {
  return (
    <Row>
      <Icon $completed={isCompleted}>
        {isCompleted ? "✓" : icon}
      </Icon>

      <Card>
        {locked ? (
          <Locked>
            🔒
            <p>{text}</p>
          </Locked>
        ) : (
          <>
            {image && (
              <Image src={image}>
                {year && <Year>{year}</Year>}
                {isCompleted && (
                  <CompletedBadge>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                      check_circle
                    </span>
                    Пройдено
                  </CompletedBadge>
                )}
              </Image>
            )}

            <Title>{title}</Title>
            <Text>{text}</Text>
          </>
        )}
      </Card>
    </Row>
  );
};

export default TimelineItem;