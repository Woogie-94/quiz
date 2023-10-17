import { createContext, useContext } from "react";
import useQuestionQurey from "../../../quries/useQuestionQurey";
import useResetQuestionResultMutation from "../../../quries/useResetQuestionResultMutation";

const DEFAULT_QUESTION_AMOUNT = 10;
const DEFAULT_QUESTION_TYPE = "multiple";

export type QuizInteractorResult = ReturnType<typeof useQuizInteractor>;
export const useQuizInteractor = () => {
  const questionQurey = useQuestionQurey({ amount: DEFAULT_QUESTION_AMOUNT, type: DEFAULT_QUESTION_TYPE });
  const { mutate: resetQuestionResults } = useResetQuestionResultMutation();

  const onRefetch = async () => {
    const { data } = await questionQurey.refetch();
    return data;
  };

  return {
    fetchQuestion: onRefetch,
    resetQuestionResults,
  };
};

export const QuizInteractorContext = createContext({} as QuizInteractorResult);
export const useQuizInteractorContext = () => {
  return useContext(QuizInteractorContext);
};
