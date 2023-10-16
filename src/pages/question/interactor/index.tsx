import { ReactNode } from "react";
import { QuestionInteractorContext, QuestionInteractorResult } from "./Question.interactor";

type Interactors = QuestionInteractorResult;

export const InteractorProvider = ({ children, interactor }: { children: ReactNode; interactor: Interactors }) => {
  return <QuestionInteractorContext.Provider value={interactor}>{children}</QuestionInteractorContext.Provider>;
};

export default InteractorProvider;
