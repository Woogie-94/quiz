import styled from "styled-components";
import AppLayout from "../../../components/AppLayout";
import Header from "./Header";
import AnswerList from "./AnswerList";
import Button from "../../../components/Button";
import { useQuestionPresenterContext } from "../presenter/Question.preseter";

const Page = () => {
  const { isLastStep, isNextButtonDisabled, onNextQeustionClick } = useQuestionPresenterContext();

  return (
    <AppLayout>
      <Wrapper>
        <div>
          <Header />
          <AnswerList />
        </div>
        <Button
          label={isLastStep ? "결과 보기" : "다음 문제"}
          disabled={isNextButtonDisabled}
          onClick={onNextQeustionClick}
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
