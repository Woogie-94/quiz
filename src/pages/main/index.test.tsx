import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Question, { IQuestion, IQuestionResponse } from "../../models/Question";
import { QuizInteractorResult } from "./interactor/Quiz.interactor";
import InteractorProvider from "./interactor";
import PresenterProvider from "./presenter";
import Page from "./components/Page";
import { QUESTION_RESPONCE_CODE__NO_RESULT, QUESTION_RESPONCE_CODE__SUCCESS } from "../../constants/question";
import "@testing-library/jest-dom";
import QuestionComponent from "../question";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "../../contexts/toastContext";
import Toast from "../../components/Toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { addQuestionResults, getQuestionResults, resetQuestionResults } from "../../services/quiz";

const useFakeInteractor = (data: IQuestionResponse): QuizInteractorResult => {
  return {
    fetchQuestion: () => {
      return new Promise(resolve => {
        return resolve({
          questions: data.results.map(item => new Question(item)),
          responseCode: data.response_code,
        });
      });
    },
    resetQuestionResults,
  };
};

const Main = ({ isError }: { isError: boolean }) => {
  return (
    <InteractorProvider
      interactor={useFakeInteractor({
        response_code: isError ? QUESTION_RESPONCE_CODE__NO_RESULT : QUESTION_RESPONCE_CODE__SUCCESS,
        results: qustionsMockData,
      })}
    >
      <PresenterProvider>
        <Page />
      </PresenterProvider>
    </InteractorProvider>
  );
};

const Wrapper = ({ isError = false }: { isError?: boolean }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ToastProvider>
          <Routes>
            <Route path={"/"} element={<Main isError={isError} />} />
            <Route path={"/questions"} element={<QuestionComponent />} />
          </Routes>
          <Toast />
        </ToastProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe("Main", () => {
  describe("'퀴즈 풀기' 버튼을 눌러 문항 데이터를 요청한다.", () => {
    it("실패하면 Toast UI에 '요청이 실패했습니다. (code-1)' 메세지가 생긴다.", async () => {
      const rendered = render(<Wrapper isError />);

      const button = rendered.getByRole("button");
      act(() => fireEvent.click(button));

      await waitFor(() => expect(screen.getByText("요청이 실패했습니다. (code-1)")).toBeInTheDocument());
    });

    it("성공하면 '/questions'로 이동한다.", async () => {
      const rendered = render(<Wrapper />);

      const button = rendered.getByRole("button");
      act(() => fireEvent.click(button));

      await waitFor(() => expect(screen.getByTestId("question-page")).toBeInTheDocument());
    });

    it("'/questions'에서 문항 데이터가 렌더링 된다.", async () => {
      const rendered = render(<Wrapper />);
      const question = qustionsMockData[0];

      await waitFor(() => {
        expect(rendered.getByText(question.question)).toBeInTheDocument();
        expect(rendered.getByText(question.category)).toBeInTheDocument();
        expect(rendered.getByText(question.difficulty)).toBeInTheDocument();
        expect(rendered.getByText(question.correct_answer)).toBeInTheDocument();
        expect(rendered.getByText(question.incorrect_answers[0])).toBeInTheDocument();
        expect(rendered.getByText(question.incorrect_answers[1])).toBeInTheDocument();
        expect(rendered.getByText(question.incorrect_answers[2])).toBeInTheDocument();
      });
    });
  });

  it("'퀴즈 풀기' 버튼을 누르면 localStorage의 questionResults가 삭제된다.", async () => {
    window.history.pushState({}, "", "/");
    const rendered = render(<Wrapper />);
    addQuestionResults({
      ...new Question(qustionsMockData[0]),
      selectedAnswer: qustionsMockData[0].correct_answer,
    });

    const button = rendered.getByRole("button");
    act(() => fireEvent.click(button));

    await waitFor(async () => {
      const results = await getQuestionResults();
      return expect(results).toBeUndefined();
    });
  });
});

const qustionsMockData: IQuestion[] = [
  {
    category: "Sports",
    type: "multiple",
    difficulty: "medium",
    question: "At which bridge does the annual Oxford and Cambridge boat race start?",
    correct_answer: "Putney",
    incorrect_answers: ["Hammersmith", "Vauxhall", "Battersea"],
  },
  {
    category: "Entertainment: Television",
    type: "multiple",
    difficulty: "medium",
    question:
      "Which of the following Autobot names in Michael Bay's movies was NOT a name for a Transformer in the original 1980's cartoon?",
    correct_answer: "Mudflap",
    incorrect_answers: ["Skids", "Sideswipe", "Ratchet"],
  },
];
