import styled from "styled-components";
import { useResultPresenterContext } from "../presenter/Result.presenter";
import Icons from "../../../assets/Icons";

const IncorrectAnswerNote = () => {
  const { result } = useResultPresenterContext();

  return (
    <Wrapper>
      <Title>오답 노트</Title>
      <ListWrapper>
        {result?.questions.map((question, index) => {
          const isCorrect = question.correctAnswer === question.selectedAnswer;
          return (
            <ItemWrapper>
              <TopWrapper>
                <LeftWrapper>
                  {isCorrect ? (
                    <Icons.IconCircle width={16} height={16} color="#add8e6" />
                  ) : (
                    <Icons.IconClose width={16} height={16} color="#ff4d4d" />
                  )}
                  <LabelWrapper>
                    <Label>{index + 1}번 문제</Label>
                    <Label>{question.difficulty}</Label>
                  </LabelWrapper>
                </LeftWrapper>
              </TopWrapper>
              <BottomWrapper>
                <Question>{question.question}</Question>
                {!isCorrect && <Answer>제출한 답 : {question.selectedAnswer}</Answer>}
                <Answer>정답 : {question.correctAnswer}</Answer>
              </BottomWrapper>
            </ItemWrapper>
          );
        })}
      </ListWrapper>
    </Wrapper>
  );
};

export default IncorrectAnswerNote;

const Wrapper = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
`;
const Title = styled.h2`
  font-size: 24px;
  color: #424242;
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;
const ItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const LabelWrapper = styled.div`
  display: flex;
  gap: 4px;
`;
const Label = styled.div`
  flex-shrink: 1;
  flex-grow: 0;
  font-size: 12px;
  color: #757575;
  padding: 4px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 24px;
`;
const Question = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: #424242;
`;
const Answer = styled.p`
  font-size: 14px;
  color: #424242;
`;
