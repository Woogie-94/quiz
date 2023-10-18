import { useQuery } from "react-query";
import QUERY_KEY from "./queryKeys";
import { getQuestionResults } from "../services/quiz";
import QuizResult from "../models/Result";

const fetch = async () => {
  const data = await getQuestionResults();
  return new QuizResult(data);
};

const useQuizResultQuery = () => {
  return useQuery(QUERY_KEY.quizResult, fetch);
};

export default useQuizResultQuery;
