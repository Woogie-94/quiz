import { useQuery } from "react-query";
import QUERY_KEY from "./queryKeys";
import { QuestionRequestParams, getQuestions } from "../services/quiz";
import Question from "../models/Question";

const fetch = async (params: QuestionRequestParams) => {
  const { data } = await getQuestions(params);

  return { questions: data.results.map(item => new Question(item)), responseCode: data.response_code };
};

const useQuestionQuery = (params: QuestionRequestParams) => {
  return useQuery(QUERY_KEY.questions, () => fetch(params), { enabled: false });
};

export default useQuestionQuery;
