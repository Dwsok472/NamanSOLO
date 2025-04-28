import React from 'react';
import styled from 'styled-components';

const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  width: 95%;
  margin: 0 auto;
  justify-content: center;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#8c0d17' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#333333')};
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ $active }) => ($active ? '#8c0d17' : '#f1f1f1')};
  }
`;

function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  return (
    <FilterGroup>
      {['전체', ...categories].map((category) => (
        <CategoryButton
          key={category}
          $active={activeCategory === category}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </CategoryButton>
      ))}
    </FilterGroup>
  );
}

export default CategoryFilter;
