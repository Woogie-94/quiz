import { useQuery } from "react-query";
import QUERY_KEY from "./queryKeys";
import { getQuestionResults } from "../services/quiz";

const fetch = async () => {
  const data = await getQuestionResults();
  return data;
};

const useQuestionResultsQuery = () => {
  return useQuery(QUERY_KEY.questionResults, fetch);
};

export default useQuestionResultsQuery;
