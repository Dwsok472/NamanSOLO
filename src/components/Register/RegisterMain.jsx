import React, { useEffect, useState } from "react";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import { useNavigate } from "react-router-dom";

function RegisterMain() {
  // 현재 단계 상태 관리
  const [step, setStep] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = sessionStorage.getItem("register-storage");
    if (!saved) {
      alert("잘못된 접근입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  }, [navigate]);

  // 단계별 컴포넌트를 렌더링하는 함수
  const renderStep = () => {
    switch (step) {
      case 2:
        return (
          <RegisterStep2 onNext={() => setStep(3)} />
        );
      case 3:
        return (
          <RegisterStep3 onNext={() => setStep(4)} />
        );
      default:
        return null;
    }
  };
  return <>{renderStep()}</>;
}

export default RegisterMain;
