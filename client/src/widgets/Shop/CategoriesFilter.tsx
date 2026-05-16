// components/CategoriesFilter.tsx
import React from "react";
import styled from "styled-components";

const FilterContainer = styled.div`
  margin-bottom: 1.5rem;
  background-color: #FFF;
  padding: 24px;
  border-radius: 16px;
`;

const FilterScroll = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  font-family: "Inter", sans-serif;
  background-color: ${({ $active }) => ($active ? "#075fab" : "#e6e8eb")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#414751")};
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 600;
  letter-spacing: 0.05em;
  white-space: nowrap;
  transition: transform 0.2s;
  border: none;
  cursor: pointer;
  margin-top: 4px;
  transition: 0.4s ease;
  &:active {
    transform: scale(0.95);
  }
  &:hover {
    transform: translateY(-4px);
  }
`;

const categories = ["Всё", "Одежда", "Аксессуары", "Канцелярские товары"];

interface CategoriesFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <FilterContainer>
      <FilterScroll>
        {categories.map((category) => (
          <FilterButton
            key={category}
            $active={activeCategory === category}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterScroll>
    </FilterContainer>
  );
};

export default CategoriesFilter;
