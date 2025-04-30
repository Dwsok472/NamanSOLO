import React, { useEffect, useState } from "react";
import styled from "styled-components";
import heartswithrate from "../img/heartswithrate1.png";
import NextButton from "../Button/NextButton";
import { useRegisterStore } from "../api2";
import CityDropdown from "./DropdownButton";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;

  .heartswithrate {
    display: block;
    margin: 0 auto;
    width: 400px;
  }

  .dday {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
    font-weight: 700;
    color: #1f1f1f;
    user-select: none;
  }

  .inputbox {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const H1 = styled.h1`
  padding-top: 80px;
  padding-bottom: 30px;
  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  color: #202020;
  user-select: none;
`;

const Input = styled.input`
  border: none;
  outline: none;
  height: 100px;
  width: 400px;
  margin-top: 40px;
  margin-bottom: 30px;
  font-size: 35px;
  font-weight: 700;
  background-color: #f6f2ea;
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    opacity: 1;
    display: block;
    cursor: pointer;
  }

  &::placeholder {
    font-size: 1rem;
    font-weight: 700;
    color: #c2c2c2;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 60px; */
  /* margin-bottom: 30px; */
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 10px;
`;

function RegisterStep3({ onNext }) {
  const { setFormData, submitRegistration, deleteForm } = useRegisterStore();
  const [dDay, setDDay] = useState("");
  const [city, setCity] = useState("");
  const [daysDiff, setDaysDiff] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (e) => {
    const selected = e.target.value;
    const selectedDate = new Date(selected);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diff = Math.floor((today - selectedDate) / (1000 * 60 * 60 * 24));
    setDaysDiff(diff >= 0 ? diff : null);

    setDDay(selected);
    setFormData({ dDay: selected });
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handlePopState = (e) => {
      if (!window.confirm('정말 나가시겠습니까? 작성한 정보가 사라집니다.')) {
        navigate(location.pathname, { replace: true }); 
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, location.pathname]);

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setFormData({ city: selectedCity });
  };

  const handleSubmit = async () => {
    if (loading) return; 
    if (!dDay) {
      alert("날짜를 선택해주세요.");
      return;
    }

    if (!city) {
      alert("도시를 선택해주세요.");
      return;
    }

    try {
      setLoading(true); 
      await submitRegistration({ dDay, city });
      deleteForm();
      onNext();
    } catch (error) {
      console.error("회원가입 중 에러:", error);
      alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  };

  return (
    <Container>
      <H1>회원가입</H1>
      <CityWrapper>
        <Label>
          도시를 선택해주세요. 사용자맞춤 날씨 정보 제공 기반이 됩니다.
        </Label>
        <CityDropdown onSelect={handleCitySelect} />
      </CityWrapper>

      <img
        src={heartswithrate}
        className="heartswithrate"
        alt="하트와 레이트"
      />

      <h1 className="dday">
        {daysDiff !== null
          ? `D-${daysDiff === 0 ? "DAY" : daysDiff}`
          : "D-DAY를 계산해줍니다."}
      </h1>
      <div className="inputbox">
        <Input
          type="date"
          placeholder="사귄 날짜를 입력해주세요"
          autoComplete="off"
          value={dDay}
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
      <ButtonWrap>
        <NextButton onClick={!loading ? handleSubmit : undefined} text={loading ? "가입 중..." : "가입하기"} />
      </ButtonWrap>
    </Container>
  );
}

export default RegisterStep3;
