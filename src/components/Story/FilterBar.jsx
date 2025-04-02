import React from "react";
import styled from "styled-components";

export const FilterBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const FilterButton = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#ffa3a3" : "#f0f0f0")};
  color: ${({ active }) => (active ? "#fff" : "#444")};
  font-weight: ${({ active }) => (active ? "700" : "500")};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? "#ff8b8b" : "#e0e0e0")};
  }
`;

const FilterBar = ({ filter, onFilterChange }) => {
  return (
    <FilterBarWrapper>
      <FilterButton
        active={filter === "latest"}
        onClick={() => onFilterChange("latest")}
      >
        최신순
      </FilterButton>
      <FilterButton
        active={filter === "comments"}
        onClick={() => onFilterChange("comments")}
      >
        댓글순
      </FilterButton>
      <FilterButton
        active={filter === "likes"}
        onClick={() => onFilterChange("likes")}
      >
        좋아요순
      </FilterButton>
    </FilterBarWrapper>
  );
};

export default FilterBar;

