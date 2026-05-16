import styled from "styled-components";
import photo from "../../assets/SUBBOTNIK.jpeg";

const Card = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }

  @media (min-width: 768px) {
    grid-column: span 2;
    display: flex;
    flex-direction: row;
  }
`;

const ImageWrap = styled.div`
  height: 192px;
  position: relative;

  @media (min-width: 768px) {
    width: 33.333%;
    height: auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  font-family: "Inter", sans-serif;

  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);

  @media (min-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  padding: 24px;
  background-color: #fff;

  @media (min-width: 768px) {
    width: 66.666%;
  }
`;

const Tag = styled.span`
  background: #775a00;
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 12px;
  font-family: "Inter", sans-serif;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #191c1e;
  margin-bottom: 12px;
  background: #fff;
  font-family: "Inter", sans-serif;
`;

const Description = styled.p`
  font-size: 16px;
  color: #414751;
  background: #fff;
  margin-bottom: 24px;
  font-family: "Inter", sans-serif;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  font-family: "Inter", sans-serif;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: rgba(148, 249, 145, 0.4);
  border-radius: 999px;
  font-family: "Inter", sans-serif;
`;

const Icon = styled.span.attrs({ className: "material-symbols-outlined" })`
  font-size: 18px;
  color: #00751f;
  background-color: transparent;
  font-variation-settings: "FILL" 1;
`;

const Points = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #00751f;
  background-color: transparent;
  font-family: "Inter", sans-serif;
`;

const Button = styled.button`
  background: #006e1d;
  font-family: "Inter", sans-serif;
  color: #ffffff;
  padding: 8px 32px;
  border-radius: 999px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

function SpecialQuestCard() {
  return (
    <Card>
      <ImageWrap>
        <img src={photo} alt="Субботник" />
        <Overlay />
      </ImageWrap>
      <Content>
        <Tag>Специальное задание</Tag>
        <Title>Субботник у корпуса Б</Title>
        <Description>
          Присоединяйтесь к своим однокурсникам в эту субботу на акции по
          благоустройству кампуса.
        </Description>
        <Footer>
          <Badge>
            <Icon>eco</Icon>
            <Points>+1500 баллов</Points>
          </Badge>
          <Button>Перейти</Button>
        </Footer>
      </Content>
    </Card>
  );
}

export default SpecialQuestCard;
