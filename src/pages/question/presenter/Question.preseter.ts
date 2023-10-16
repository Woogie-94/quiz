import { createContext, useContext, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import Question from "../../../models/Question";

interface RouteState {
  questions: Question[];
}

export type QuestionPresenterResult = ReturnType<typeof useQuestionPresenter>;
export const useQuestionPresenter = () => {
  const navigation = useNavigate();
  const { state, search } = useLocation() as Location<RouteState>;

  const step = Number(new URLSearchParams(search).get("step"));
  const isLastStep = step >= 10;
  const question = state.questions[step - 1];

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const correctAnswerIndex = selectedAnswer && question.answers.indexOf(question.correctAnswer);
  const incorrectAnswerIndex = question.answers.indexOf(selectedAnswer);
  const isNextButtonDisabled = !selectedAnswer;

  const onAnwserClick = (answer: string) => {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);
  };

  const onNextQeustionClick = () => {
    setSelectedAnswer("");
    navigation(`?step=${step + 1}`, { state: { questions: state.questions } });
  };

  return {
    question,
    isLastStep,
    isNextButtonDisabled,
    incorrectAnswerIndex,
    correctAnswerIndex,
    onNextQeustionClick,
    onAnwserClick,
  };
};

export const QuestionPresenterContext = createContext({} as QuestionPresenterResult);
export const useQuestionPresenterContext = () => {
  return useContext(QuestionPresenterContext);
};
