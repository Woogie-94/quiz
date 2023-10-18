import { useMutation } from "react-query";
import { resetQuestionResults } from "../services/quiz";

const request = async () => {
  await resetQuestionResults();
};

const useResetQuestionResultMutation = () => {
  return useMutation({ mutationFn: request });
};

export default useResetQuestionResultMutation;
