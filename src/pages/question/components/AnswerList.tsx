import styled from "styled-components";
import { useQuestionPresenterContext } from "../presenter/Question.preseter";

const AnswerList = () => {
  const { question, correctAnswerIndex, incorrectAnswerIndex, onAnwserClick } = useQuestionPresenterContext();

  return (
    <Wrapper>
      {question.answers.map((item, index) => (
        <Answer
          key={item}
          $isCorrect={correctAnswerIndex === index}
          $isIncorrect={incorrectAnswerIndex === index}
          onClick={() => onAnwserClick(item)}
        >
          {item}
        </Answer>
      ))}
    </Wrapper>
  );
};

export default AnswerList;

const Wrapper = styled.ul``;
const Answer = styled.li<{ $isCorrect: boolean; $isIncorrect: boolean }>`
  cursor: pointer;
  width: 100%;
  padding: 28px;
  text-align: center;
  font-size: 32px;
  border-radius: 8px;
  transition: 0.2s;
  background-color: ${({ $isCorrect, $isIncorrect }) =>
    $isCorrect ? "#add8e6" : $isIncorrect ? "#ff4d4d" : "transparant"};

  &:hover {
    background-color: ${({ $isCorrect, $isIncorrect }) =>
      $isCorrect ? "#add8e6" : $isIncorrect ? "#ff4d4d" : "transparant"};
  }
`;
