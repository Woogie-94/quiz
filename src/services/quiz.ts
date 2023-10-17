import axios from "axios";
import Question, { IQuestionResponse, QuestionType } from "../models/Question";
import { QUESTION_RESULTS_LOCALHOST_KEY } from "../constants/question";

export interface QuestionRequestParams {
  amount: number;
  type: QuestionType;
}
export const getQuestions = ({ amount, type }: QuestionRequestParams) => {
  return axios.get<IQuestionResponse>("https://opentdb.com/api.php", { params: { amount, type } });
};

export interface QuestionResultParams extends Question {
  selectedAnswer: string;
}
export const getQuestionResults = () => {
  const value = localStorage.getItem(QUESTION_RESULTS_LOCALHOST_KEY);

  if (value) {
    return JSON.parse(value) as QuestionResultParams[];
  }
};
export const addQuestionResults = (params: QuestionResultParams) => {
  const questionResult = getQuestionResults();

  localStorage.setItem(
    QUESTION_RESULTS_LOCALHOST_KEY,
    JSON.stringify(questionResult ? [...questionResult, params] : [params]),
  );
};
export const resetQuestionResults = async () => {
  await localStorage.removeItem(QUESTION_RESULTS_LOCALHOST_KEY);
};
