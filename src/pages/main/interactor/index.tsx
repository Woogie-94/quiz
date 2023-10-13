import { ReactNode } from "react";
import { QuizInteractorContext, QuizInteractorResult } from "./Quiz.interactor";

type Interactors = QuizInteractorResult;

export const InteractorProvider = ({ children, interactor }: { children: ReactNode; interactor: Interactors }) => {
  return <QuizInteractorContext.Provider value={interactor}>{children}</QuizInteractorContext.Provider>;
};

export default InteractorProvider;
