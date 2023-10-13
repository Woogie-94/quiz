import styled from "styled-components";
import AppLayout from "../../../components/AppLayout";
import { useQuizPresenterContext } from "../presenter/Quiz.presenter";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

const Page = () => {
  const { onStartClick } = useQuizPresenterContext();

  return (
    <AppLayout>
      <Wrapper>
        <TitleWrapper>
          <Title>퀴즈 사이트에 오신걸 환영합니다.</Title>
        </TitleWrapper>
        <Link to="/questions" data-testid="link" />
        <Button data-testid="button" label="퀴즈 풀기" onClick={onStartClick} />
      </Wrapper>
    </AppLayout>
  );
};

export default Page;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  color: #3b3c42;
`;

const TitleWrapper = styled.div`
  margin-bottom: 40px;
`;
