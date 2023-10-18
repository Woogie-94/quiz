import { createContext, useContext, useEffect, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import Question from "../../../models/Question";
import { useQuestionInteractorContext } from "../interactor/Question.interactor";
import { QUESTION_LAST_STEP } from "../../../constants/question";
import { setQuizEndTime } from "../../../services/quiz";

interface RouteState {
  questions: Question[];
}

export type QuestionPresenterResult = ReturnType<typeof useQuestionPresenter>;
export const useQuestionPresenter = () => {
  const { questionResults, refetch, addResult } = useQuestionInteractorContext();

  const navigation = useNavigate();
  const { state, search } = useLocation() as Location<RouteState>;

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const step = Number(new URLSearchParams(search).get("step"));
  const isLastStep = step >= QUESTION_LAST_STEP;
  const question = state.questions[step - 1];

  const correctAnswerIndex = selectedAnswer && question.answers.indexOf(question.correctAnswer);
  const incorrectAnswerIndex = question.answers.indexOf(selectedAnswer);
  const isNextButtonDisabled = !selectedAnswer;

  const onAnswerClick = (answer: string) => {
    if (selectedAnswer) {
      return;
    }

    addResult({ ...question, selectedAnswer: answer });
    setSelectedAnswer(answer);
  };

  const onNextQuestionClick = () => {
    refetch();
    setSelectedAnswer("");

    if (isLastStep) {
      setQuizEndTime();
      navigation("/result");
    } else {
      navigation(`?step=${step + 1}`, { state: { questions: state.questions } });
    }
  };

  useEffect(() => {
    const result = questionResults?.[step - 1];
    if (result) {
      setSelectedAnswer(result.selectedAnswer);
    }

    return () => {
      setSelectedAnswer("");
    };
  }, [questionResults, step]);

  return {
    question,
    isLastStep,
    isNextButtonDisabled,
    incorrectAnswerIndex,
    correctAnswerIndex,
    onNextQuestionClick,
    onAnswerClick,
  };
};

export const QuestionPresenterContext = createContext({} as QuestionPresenterResult);
export const useQuestionPresenterContext = () => {
  return useContext(QuestionPresenterContext);
};
