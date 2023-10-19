import { createContext, useContext } from "react";
import useQuestionQuery from "../../../queries/useQuestionQuery";
import useResetQuestionResultMutation from "../../../queries/useResetQuestionResultMutation";

const DEFAULT_QUESTION_AMOUNT = 10;
const DEFAULT_QUESTION_TYPE = "multiple";

export type QuizInteractorResult = ReturnType<typeof useQuizInteractor>;
export const useQuizInteractor = () => {
  const questionQuery = useQuestionQuery({ amount: DEFAULT_QUESTION_AMOUNT, type: DEFAULT_QUESTION_TYPE });
  const { mutate: resetQuestionResults } = useResetQuestionResultMutation();

  const onRefetch = async () => {
    const { data } = await questionQuery.refetch();
    return data;
  };

  return {
    isLoading: questionQuery.isLoading,
    fetchQuestion: onRefetch,
    resetQuestionResults,
  };
};

export const QuizInteractorContext = createContext({} as QuizInteractorResult);
export const useQuizInteractorContext = () => {
  return useContext(QuizInteractorContext);
};
