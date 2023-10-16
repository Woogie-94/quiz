import { createContext, useContext } from "react";

export type QuestionInteractorResult = ReturnType<typeof useQuestionInteractor>;
export const useQuestionInteractor = () => {
  return {};
};

export const QuestionInteractorContext = createContext({} as QuestionInteractorResult);
export const useQuestionInteractorContext = () => {
  return useContext(QuestionInteractorContext);
};
