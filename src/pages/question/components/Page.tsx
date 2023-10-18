import styled from "styled-components";
import AppLayout from "../../../components/AppLayout";
import Header from "./Header";
import AnswerList from "./AnswerList";
import Button from "../../../components/Button";
import { useQuestionPresenterContext } from "../presenter/Question.presenter";

const Page = () => {
  const { isLastStep, isNextButtonDisabled, onNextQuestionClick } = useQuestionPresenterContext();

  return (
    <AppLayout>
      <Wrapper>
        <div>
          <Header />
          <AnswerList />
        </div>
        <Button
          label={isLastStep ? "결과 보기" : "다음 문항"}
          disabled={isNextButtonDisabled}
          onClick={onNextQuestionClick}
        />
      </Wrapper>
    </AppLayout>
  );
};

export default Page;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
