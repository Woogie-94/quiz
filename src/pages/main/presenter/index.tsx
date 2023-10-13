import { ReactNode } from "react";
import { QuizPresenterContext, useQuizPresenter } from "./Quiz.presenter";

interface Props {
  children: ReactNode;
}

const PresenterProvider = ({ children }: Props) => {
  const quizPresenter = useQuizPresenter();

  return <QuizPresenterContext.Provider value={quizPresenter}>{children}</QuizPresenterContext.Provider>;
};

export default PresenterProvider;
