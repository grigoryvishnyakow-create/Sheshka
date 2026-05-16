// pages/UniversityShop.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import HeroSection from '../widgets/Shop/HeroSection';
import CategoriesFilter from '../widgets/Shop/CategoriesFilter';
import ProductGrid from '../widgets/Shop/ProductGrid';

const PageContainer = styled.main`
  padding-top: 5rem;
  padding-bottom: 8rem;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f7f9fc;
  color: #191c1e;
  min-height: 100vh;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Items');

  return (
    <PageContainer>
      <Section>
        <HeroSection />
      </Section>

      <Section>
        <CategoriesFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </Section>

      <Section>
        <ProductGrid activeCategory={activeCategory} />
      </Section>
    </PageContainer>
  );
};

export default Shop;