import styled from 'styled-components';
import topImg from './img/top.png';
import { useEffect, useState } from 'react';

const FooterWrapper = styled.footer`
  width: 100%;
  background: rgba(177, 177, 177, 0.85);
  color: #333;
  padding: 12px 0;
  font-size: 0.9rem;
  line-height: 1.3;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
`;

const FooterTitle = styled.h4`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 1px;
  margin-bottom: 6px;
  color: white;
`;

const FooterLine = styled.hr`
  border: none;
  border-top: 1px solid #ffffff;
  margin: 6px 0 12px;
`;

const FooterGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 24px;
`;

const Column = styled.div`
  flex-basis: 30%;
  min-width: 200px;
  display: flex;
  flex-direction: column;

  h5 {
    font-weight: bold;
    margin-bottom: 6px;
    color: white;
    font-size: 1.2rem;
  }

  p,
  a {
    margin-bottom: 3px;
    color: white;
    font-size: 0.8rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FixedBtn = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  width: 45px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${($props) => ($props.show ? 1 : 0)};
  transition: opacity 0.8s ease;

  &:focus {
    outline: none;
  }

  img {
    width: 45px;
    height: 45px;
    display: block;
    transition: 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;


const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <FooterWrapper>
        <FooterInner>
          <FooterTitle>We ARE...</FooterTitle>
          <FooterLine />
          <FooterGrid>
            <Column>
              <h5>회사 정보</h5>
              <p>대표자: 김하늘</p>
              <p>사업자 등록번호: 123-12-12345</p>
            </Column>

            <Column>
              <h5>고객센터</h5>
              <p>전화: 042-124-5210</p>
              <p>운영시간: 평일 9:00 ~ 18:00</p>
            </Column>

            <Column>
              <h5>정책</h5>
              <a href="/terms">이용약관</a>
              <a href="/privacy">개인정보처리방침</a>
            </Column>
          </FooterGrid>
        </FooterInner>
      </FooterWrapper>

      {showTopBtn && (
        <FixedBtn onClick={scrollToTop} $show={showTopBtn}>
          <img src={topImg} alt="Top" />
        </FixedBtn>
      )}
    </>
  );
};

export default Footer;
