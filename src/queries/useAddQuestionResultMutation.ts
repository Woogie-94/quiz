import { useMutation } from "react-query";
import { addQuestionResults } from "../services/quiz";
import { QuestionResult } from "../models/Result";

const request = async (params: QuestionResult) => {
  await addQuestionResults(params);
};

const useAddQuestionResultMutation = () => {
  return useMutation({ mutationFn: request });
};

export default useAddQuestionResultMutation;
