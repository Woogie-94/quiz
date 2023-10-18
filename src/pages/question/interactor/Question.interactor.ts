import { createContext, useContext } from "react";
import useQuestionResultsQuery from "../../../queries/useQuestionResultsQuery";
import useAddQuestionResultMutation from "../../../queries/useAddQuestionResultMutation";
import useResetQuestionResultMutation from "../../../queries/useResetQuestionResultMutation";

export type QuestionInteractorResult = ReturnType<typeof useQuestionInteractor>;
export const useQuestionInteractor = () => {
  const { data, refetch } = useQuestionResultsQuery();
  const { mutate: addResult } = useAddQuestionResultMutation();
  const { mutate: resetResult } = useResetQuestionResultMutation();

  const onRefetch = () => {
    refetch();
  };

  return { questionResults: data, refetch: onRefetch, addResult, resetResult };
};

export const QuestionInteractorContext = createContext({} as QuestionInteractorResult);
export const useQuestionInteractorContext = () => {
  return useContext(QuestionInteractorContext);
};
