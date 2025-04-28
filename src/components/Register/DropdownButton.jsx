import { useEffect, useState } from "react";
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
  background-color: #f6f2ea;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  bottom: 100%;
  left: 0;
  width: 120%;
  background-color: #f6f2ea;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 5px;
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

const cities = [
  "서울",
  "부산",
  "대구",
  "인천",
  "대전",
  "울산",
  "세종",
  "수원",
  "용인",
  "성남",
  "고양",
  "부천",
  "안산",
  "안양",
  "남양주",
  "화성",
  "평택",
  "의정부",
  "시흥",
  "광명",
  "광주",
  "하남",
  "군포",
  "이천",
  "안성",
  "오산",
  "양주",
  "파주",
  "동두천",
  "구리",
  "가평",
  "양평",
  "연천",
  "포천",
  "춘천",
  "원주",
  "강릉",
  "동해",
  "삼척",
  "태백",
  "속초",
  "홍천",
  "횡성",
  "평창",
  "정선",
  "철원",
  "화천",
  "양구",
  "인제",
  "고성",
  "양양",
  "청주",
  "충주",
  "제천",
  "보은",
  "옥천",
  "영동",
  "진천",
  "괴산",
  "음성",
  "단양",
  "증평",
  "천안",
  "아산",
  "공주",
  "보령",
  "서산",
  "논산",
  "계룡",
  "당진",
  "금산",
  "부여",
  "서천",
  "청양",
  "홍성",
  "예산",
  "태안",
  "전주",
  "군산",
  "익산",
  "남원",
  "김제",
  "정읍",
  "완주",
  "진안",
  "무주",
  "장수",
  "임실",
  "순창",
  "고창",
  "부안",
  "목포",
  "순천",
  "여수",
  "나주",
  "광양",
  "담양",
  "곡성",
  "구례",
  "고흥",
  "보성",
  "화순",
  "장흥",
  "강진",
  "해남",
  "영암",
  "무안",
  "함평",
  "영광",
  "장성",
  "완도",
  "진도",
  "신안",
  "포항",
  "경주",
  "김천",
  "안동",
  "구미",
  "영주",
  "영천",
  "상주",
  "문경",
  "경산",
  "울진",
  "의성",
  "영양",
  "영덕",
  "봉화",
  "청송",
  "성주",
  "칠곡",
  "군위",
  "청도",
  "창원",
  "진주",
  "통영",
  "사천",
  "김해",
  "밀양",
  "거제",
  "양산",
  "의령",
  "함안",
  "창녕",
  "남해",
  "하동",
  "산청",
  "함양",
  "거창",
  "합천",
  "제주",
  "서귀포",
];
const CityDropdown = ({ value = "도시", onSelect, isEditable = true }) => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(value || "도시");

  useEffect(() => {
    setSelectedCity(value || "도시");
  }, [value]);

  const toggleDropdown = () => {
    if (isEditable) {
      setOpen((prev) => !prev);
    }
  };

  const handleSelect = (city) => {
    setSelectedCity(city);
    setOpen(false);
    onSelect(city);
  };

  return (
    <DropdownWrapper>
      <DropdownButton onClick={toggleDropdown}>{selectedCity}</DropdownButton>
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
