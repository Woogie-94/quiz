import axios from "axios";
import { QUESTION_RESULTS_LOCALSTORAGE_KEY } from "../constants/question";
import { IQuestionResponse, QuestionType } from "../models/Question";
import { QuestionResult } from "../models/Result";

export interface QuestionRequestParams {
  amount: number;
  type: QuestionType;
}
export const getQuestions = ({ amount, type }: QuestionRequestParams) => {
  return axios.get<IQuestionResponse>("https://opentdb.com/api.php", { params: { amount, type } });
};

export const getQuestionResults = async () => {
  const value = await localStorage.getItem(QUESTION_RESULTS_LOCALSTORAGE_KEY);

  return (value ? JSON.parse(value) : []) as QuestionResult[];
};
export const addQuestionResults = async (params: QuestionResult) => {
  const questionResult = await getQuestionResults();

  localStorage.setItem(
    QUESTION_RESULTS_LOCALSTORAGE_KEY,
    JSON.stringify(questionResult ? [...questionResult, params] : [params]),
  );
};
export const resetQuestionResults = async () => {
  await localStorage.removeItem(QUESTION_RESULTS_LOCALSTORAGE_KEY);
};
