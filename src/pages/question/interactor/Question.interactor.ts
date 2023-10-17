import { createContext, useContext } from "react";
import useQuestionResultsQuery from "../../../quries/useQuestionResultsQurey";
import useAddQuestionResultMutation from "../../../quries/useAddQuestionResultMutation";
import useResetQuestionResultMutation from "../../../quries/useResetQuestionResultMutation";

export type QuestionInteractorResult = ReturnType<typeof useQuestionInteractor>;
export const useQuestionInteractor = () => {
  const { data, refetch } = useQuestionResultsQuery();
  const { mutate: addResult } = useAddQuestionResultMutation();
  const { mutate: resetResult } = useResetQuestionResultMutation();

  const onRefetch = async () => {
    const { data } = await refetch();
    return data;
  };

  return { questionResults: data, refetch: onRefetch, addResult, resetResult };
};

export const QuestionInteractorContext = createContext({} as QuestionInteractorResult);
export const useQuestionInteractorContext = () => {
  return useContext(QuestionInteractorContext);
};
