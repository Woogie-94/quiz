import styled from "styled-components";
import AppLayout from "../../../components/AppLayout";
import { useQuizPresenterContext } from "../presenter/Quiz.presenter";
import Button from "../../../components/Button";

const Page = () => {
  const { isLoading, onStartClick } = useQuizPresenterContext();

  return (
    <AppLayout>
      <Wrapper>
        <TitleWrapper>
          <Title>퀴즈 사이트에 오신걸 환영합니다.</Title>
        </TitleWrapper>
        <Button data-testid="button" label="퀴즈 풀기" onClick={onStartClick} loading={isLoading} />
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
`;

const TitleWrapper = styled.div`
  margin-bottom: 40px;
`;
