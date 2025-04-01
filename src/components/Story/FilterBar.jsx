import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
`;

const TabButton = styled.button`
  padding: 6px 12px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => (props.$active ? "#fda899" : "#eee")};
  color: ${(props) => (props.$active ? "#fff" : "#555")};
  font-weight: 500;
  cursor: pointer;
`;

const SearchBox = styled.input`
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid #ccc;
  width: 200px;
`;

const FilterBar = ({ filter, onFilterChange, search, onSearchChange }) => {
  return (
    <Bar>
      <Tabs>
        <TabButton
          $active={filter === "latest"}
          onClick={() => onFilterChange("latest")}
        >
          최신순
        </TabButton>
        <TabButton
          $active={filter === "comments"}
          onClick={() => onFilterChange("comments")}
        >
          댓글순
        </TabButton>
        <TabButton
          $active={filter === "likes"}
          onClick={() => onFilterChange("likes")}
        >
          좋아요순
        </TabButton>
      </Tabs>

      <SearchBox
        placeholder="userName 검색"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Bar>
  );
};

export default FilterBar;
