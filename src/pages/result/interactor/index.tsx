import { ReactNode } from "react";
import { ResultInteractorContext, ResultInteractorResult } from "./Result.interactor";

type Interactors = ResultInteractorResult;

export const InteractorProvider = ({ children, interactor }: { children: ReactNode; interactor: Interactors }) => {
  return <ResultInteractorContext.Provider value={interactor}>{children}</ResultInteractorContext.Provider>;
};

export default InteractorProvider;
