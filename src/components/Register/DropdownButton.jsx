import { useState } from "react";
import styled from "styled-components";

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  padding: 10px 14px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: 120%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 5px;
  list-style: none;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
  z-index: 999;
`;

const DropdownItem = styled.li`
    text-align: center;
    cursor: pointer;
    &:hover {
        background-color: #f2f2f2;
    }
`;

const cities = ["서울", "경기", "양양", "김제", "수원", "대전", "청주", "울진", "보령", "전주", "창원",
    "속초", "인천", "대구", "광주", "울산", "세종", "부산"];

const CityDropdown = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("도시");

  const handleSelect = (city) => {
    setSelectedCity(city);
    setOpen(false);
    onSelect(city);
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={() => setOpen((prev) => !prev)}>
        {selectedCity}
      </DropdownButton>
      {open && (
        <DropdownList>
          {cities.map((city) => (
            <DropdownItem key={city} onClick={() => handleSelect(city)}>
              {city}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default CityDropdown;