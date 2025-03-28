import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding: 0 400px; /* 전체 컨테이너에 좌우 간격을 추가 (옵션) */
`;
const H1 = styled.h1`
  font-size: 5rem;
  font-weight: 700;
`;

const CardWrap = styled.div`
  width: 550px;
  margin: 0 auto;
  margin-top: 50px;
`;
const Card = styled.div`
  width: 550px;
  height: 600px;
  background-color: #ffdcd6;
  clip-path: polygon(
    10% 0%,
    90% 0%,
    120% 25%,
    120% 75%,
    90% 100%,
    10% 100%,
    0% 90%,
    0% 10%
  );
  margin: 0 auto;
`;

const Top = styled.div`
  width: 100%;
  height: 30%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .section {
    margin-bottom: 20px;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  button:hover {
    background-color: #ddd;
  }
`;
function Register() {
  return (
    <Container>
      <H1></H1>
      <CardWrap>
        <Card>
          <Top>
            <div className="terms-container">
              <section className="section">
                <h2>제1조 (목적)</h2>
                <p>
                  본 약관은 [서비스 이름] (이하 '회사')이 제공하는 [서비스 이름]
                  (이하 '서비스')의 이용과 관련하여 회사와 이용자 간의 권리,
                  의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              <section className="section">
                <h2>제2조 (서비스의 제공)</h2>
                <p>
                  회사는 서비스의 내용, 범위 및 조건을 제공하며, 서비스 이용자는
                  이를 따라야 합니다. 서비스는 언제든지 변경될 수 있습니다.
                </p>
              </section>

              <section className="section">
                <h2>제3조 (이용자의 의무)</h2>
                <p>
                  이용자는 서비스 이용 중 다음과 같은 행위를 해서는 안 됩니다:
                </p>
                <ul>
                  <li>불법적인 목적이나 수단으로 서비스를 이용하는 행위</li>
                  <li>타인의 개인정보를 도용하거나 침해하는 행위</li>
                  <li>기타 공공질서에 위반되는 행위</li>
                </ul>
              </section>

              <section className="section">
                <h2>제4조 (약관의 변경)</h2>
                <p>
                  회사는 필요에 따라 본 약관을 변경할 수 있으며, 변경 사항은
                  서비스 화면에 공지되거나 다른 방법으로 이용자에게 통지됩니다.
                </p>
              </section>
              <button>동의합니다</button>
            </div>
          </Top>
        </Card>
      </CardWrap>
    </Container>
  );
}

export default Register;
