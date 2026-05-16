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
}

const Row = styled.div`
  display: flex;
  gap: 24px;
`;

const Icon = styled.div`
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #075fab;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
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

const Locked = styled.div`
  text-align: center;
  padding: 40px;
  color: #727782;
`;

const Title = styled.h3`
  margin-bottom: 8px;
`;

const Text = styled.p`
  color: #727782;
`;

const TimelineItem: React.FC<Props> = ({
  icon,
  title,
  text,
  image,
  year,
  locked,
}) => {
  return (
    <Row>
      <Icon>{icon}</Icon>

      <Card>
        {locked ? (
          <Locked>
            🔒
            <p>{text}</p>
          </Locked>
        ) : (
          <>
            {image && <Image src={image}>{year && <Year>{year}</Year>}</Image>}

            <Title>{title}</Title>
            <Text>{text}</Text>
          </>
        )}
      </Card>
    </Row>
  );
};

export default TimelineItem;
