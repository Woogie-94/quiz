import { ReactNode } from "react";
import { QuestionPresenterContext, useQuestionPresenter } from "./Question.presenter";

interface Props {
  children: ReactNode;
}

const PresenterProvider = ({ children }: Props) => {
  const quizPresenter = useQuestionPresenter();

  return <QuestionPresenterContext.Provider value={quizPresenter}>{children}</QuestionPresenterContext.Provider>;
};

export default PresenterProvider;
