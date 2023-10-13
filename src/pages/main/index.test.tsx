import { ReactElement } from "react";
import { renderHook, screen, waitFor, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Question, { IQuestion, IQuestionResponse } from "../../models/Question";
import { QuizInteractorResult } from "./interactor/Quiz.interactor";
import InteractorProvider from "./interactor";
import PresenterProvider from "./presenter";
import Page from "./components/Page";
import { useQuizPresenterContext } from "./presenter/Quiz.presenter";
import { QUESTION_RESPONCE_CODE__NO_RESULT, QUESTION_RESPONCE_CODE__SUCCESS } from "../../constants/question";
import "@testing-library/jest-dom";
import QuestionComponent from "../question";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "../../contexts/toastContext";
import Toast from "../../components/Toast";

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
  };
};

const Wrapper = ({ children, isError }: { children: ReactElement; isError: boolean }) => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <InteractorProvider
          interactor={useFakeInteractor({
            response_code: isError ? QUESTION_RESPONCE_CODE__NO_RESULT : QUESTION_RESPONCE_CODE__SUCCESS,
            results: mockResult,
          })}
        >
          <PresenterProvider>
            {children}
            <Page />
          </PresenterProvider>
        </InteractorProvider>
        <Toast />
      </ToastProvider>

      <Routes>
        <Route path={"/"} element={<></>} />
        <Route path={"/questions"} element={<QuestionComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

const prepare = ({ isError }: { isError: boolean }) => {
  return renderHook(() => useQuizPresenterContext(), {
    wrapper: ({ children }) => <Wrapper isError={isError}>{children}</Wrapper>,
  }).result.current;
};

describe("Main Page", async () => {
  it("onStartClick 이벤트를 실행해 요청이 성공하면 '/questions'로 이동한다.", async () => {
    const { onStartClick } = prepare({ isError: false });

    act(onStartClick);
    await waitFor(() => expect(screen.getByTestId("question-page")).toBeInTheDocument());
  });

  it("onStartClick 이벤트를 실행해 요청에 실패하면 Toast UI에 '요청이 실패했습니다. (code-1)' 메세지가 생긴다.", async () => {
    const { onStartClick } = prepare({ isError: true });

    act(onStartClick);
    await waitFor(() => expect(screen.getByText("요청이 실패했습니다. (code-1)")).toBeInTheDocument());
  });
});

const mockResult: IQuestion[] = [
  {
    category: "Sports",
    type: "multiple",
    difficulty: "medium",
    question: "At which bridge does the annual Oxford and Cambridge boat race start?",
    correct_answer: "Putney",
    incorrect_answers: ["Hammersmith", "Vauxhall ", "Battersea"],
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
