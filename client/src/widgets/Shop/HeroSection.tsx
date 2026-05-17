// components/HeroSection.tsx
import React from "react";
import styled from "styled-components";
import Z from "../../assets/Значок_КГУ.jpg";

const HeroContainer = styled.div`
  font-family: "Inter", sans-serif;
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  height: 12rem;
  display: flex;
  align-items: flex-end;
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
`;

const HeroContent = styled.div`
  position: relative;
  padding: 1.5rem;
  width: 100%;
`;

const Badge = styled.span`
  font-family: "Inter", sans-serif;
  background-color: #006e1d;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const HeroTitle = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
`;

const HeroDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 20px;
`;

const heroData = {
  image:
    Z,
  title: "Значок члена семьи",
  description: "Создано ради комфорта.",
  badge: "Ограниченная серия",
};

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <HeroImage src={heroData.image} alt="Featured Hoodie" />
      <HeroOverlay />
      <HeroContent>
        <Badge>{heroData.badge}</Badge>
        <HeroTitle>{heroData.title}</HeroTitle>
        <HeroDescription>{heroData.description}</HeroDescription>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
