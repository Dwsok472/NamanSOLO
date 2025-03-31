import React, { useState } from 'react';
import RegisterStep1 from './RegisterStep1'
import RegisterStep2 from './RegisterStep2'
import RegisterStep3 from './RegisterStep3'
import RegisterStep4 from './RegisterStep4'

function RegisterMain() {
    // 현재 단계 상태 관리
    const [step, setStep] = useState(1);

    // 단계별 컴포넌트를 렌더링하는 함수
    const renderStep = () => {
        switch (step) {
            case 1:
                return <RegisterStep1 onNext={() => setStep(2)} />;
            case 2:
                return <RegisterStep2 onNext={() => setStep(3)} />;
            case 3:
                return <RegisterStep3 onNext={() => setStep(4)} />;
            case 4:
                return <RegisterStep4 />;
            default:
                return null;
        }
    };
    return (
        <>
            {renderStep()}
        </>
    )
}

export default RegisterMain
