import { ReactNode } from "react";
import { QuestionPresenterContext, useQuestionPresenter } from "./Question.presenter";

interface Props {
  children: ReactNode;
}

const PresenterProvider = ({ children }: Props) => {
  const questionPresenter = useQuestionPresenter();

  return <QuestionPresenterContext.Provider value={questionPresenter}>{children}</QuestionPresenterContext.Provider>;
};

export default PresenterProvider;
