import styled from "styled-components";
import { useQuestionPresenterContext } from "../presenter/Question.preseter";
import { QuestionDifficulty } from "../../../models/Question";

const Header = () => {
  const { question } = useQuestionPresenterContext();

  return (
    <QuestionWrapper>
      <InfoWrapper>
        <Category>{question.category}</Category>
        <Difficulty $difficulty={question.difficulty}>{question.difficulty}</Difficulty>
      </InfoWrapper>
      <Question>{question.question}</Question>
    </QuestionWrapper>
  );
};

export default Header;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 36px;
`;
const Question = styled.h1`
  font-weight: bold;
  font-size: 32px;
`;
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Category = styled.p`
  font-size: 18px;
  color: #666;
`;
const Difficulty = styled.span<{ $difficulty: QuestionDifficulty }>`
  padding: 4px 8px;
  border-radius: 8px;
  background-color: ${({ $difficulty }) =>
    $difficulty === "hard" ? "#f56666" : $difficulty === "medium" ? "#00c896" : "#4D4DFF"};
  font-size: 16px;
  color: #fff;
`;
