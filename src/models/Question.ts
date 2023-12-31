import { QUESTION_RESPONSE_CODES } from "../constants/question";
import { decodeHTMLEntities } from "../utils";

export type QuestionType = "choice" | "multiple";
export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionResponseCode = (typeof QUESTION_RESPONSE_CODES)[number];

export interface IQuestion {
  category: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IQuestionResponse {
  response_code: QuestionResponseCode;
  results: IQuestion[];
}

class Question {
  category: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  answers: string[];

  constructor(data: IQuestion) {
    this.category = data.category;
    this.type = data.type;
    this.difficulty = data.difficulty;
    this.question = decodeHTMLEntities(data.question);
    this.correctAnswer = decodeHTMLEntities(data.correct_answer);
    this.incorrectAnswers = data.incorrect_answers.map(decodeHTMLEntities);
    this.answers = Question.shuffle(this.incorrectAnswers, this.correctAnswer);
  }

  static shuffle(array: string[], item: string) {
    const arr = [...array];
    const randomIndex = Math.floor(Math.random() * (arr.length + 1));
    arr.splice(randomIndex, 0, item);

    return arr;
  }
}

export default Question;
