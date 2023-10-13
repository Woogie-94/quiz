import { createContext, useContext } from "react";
import useQuestionQurey from "../../../quries/useQuestionQurey";

const DEFAULT_QUESTION_AMOUNT = 10000;
const DEFAULT_QUESTION_TYPE = "multiple";

export type QuizInteractorResult = ReturnType<typeof useQuizInteractor>;
export const useQuizInteractor = () => {
  const questionQurey = useQuestionQurey({ amount: DEFAULT_QUESTION_AMOUNT, type: DEFAULT_QUESTION_TYPE });

  const onRefetch = async () => {
    const { data } = await questionQurey.refetch();
    return data;
  };

  return {
    fetchQuestion: onRefetch,
  };
};

const initialQuizInteractor: QuizInteractorResult = {
  fetchQuestion: () => new Promise(() => {}),
};

export const QuizInteractorContext = createContext(initialQuizInteractor);
export const useQuizInteractorContext = () => {
  return useContext(QuizInteractorContext);
};
