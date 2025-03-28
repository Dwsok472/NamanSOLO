import styled from 'styled-components';

const PageWrapper = styled.div`
  padding: 40px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const LoginPage = () => {
  return (
    <PageWrapper>
      <h1>로그인 페이지</h1>
      <p>여기에 로그인 폼 만들 거예요!</p>
    </PageWrapper>
  );
};

export default LoginPage;
