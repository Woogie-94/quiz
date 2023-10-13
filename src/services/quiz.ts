import axios from "axios";
import { IQuestionResponse, QuestionType } from "../models/Question";

export interface QuestionRequestParams {
  amount: number;
  type: QuestionType;
}
export const getQuestions = ({ amount, type }: QuestionRequestParams) => {
  return axios.get<IQuestionResponse>("https://opentdb.com/api.php", { params: { amount, type } });
};
