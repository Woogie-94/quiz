import { useMutation } from "react-query";
import { QuestionResultParams, addQuestionResults } from "../services/quiz";

const reqeust = async (params: QuestionResultParams) => {
  await addQuestionResults(params);
};

const useAddQuestionResultMutation = () => {
  return useMutation({ mutationFn: reqeust });
};

export default useAddQuestionResultMutation;
