import { beforeEach, describe, expect, it } from "vitest";
import { QuestionInteractorResult } from "./interactor/Question.interactor";
import InteractorProvider from "./interactor";
import PresenterProvider from "./presenter";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PATH_QUESTION } from "../../constants/path";
import "@testing-library/jest-dom";
import { QuestionResultParams, addQuestionResults, getQuestionResults } from "../../services/quiz";
import { ReactElement } from "react";
import Header from "./components/Header";
import AnswerList from "./components/AnswerList";
import Question from "../../models/Question";
import Page from "./components/Page";
import { QUESTION_LAST_STEP } from "../../constants/question";

const useFakeInteractor = (): QuestionInteractorResult => {
  return {
    questionResults: [],
    refetch: async () => [],
    addResult: async (params: QuestionResultParams) => {
      addQuestionResults(params);
    },
    resetResult: async () => {},
  };
};

const Wrapper = ({ children }: { children: ReactElement }) => {
  return (
    <MemoryRouter
      initialEntries={[
        {
          pathname: PATH_QUESTION,
          search: "?step=1",
          state: {
            questions: questionMockData,
          },
        },
      ]}
    >
      <InteractorProvider interactor={useFakeInteractor()}>
        <PresenterProvider>{children}</PresenterProvider>
      </InteractorProvider>
    </MemoryRouter>
  );
};

describe("Question Page - Component", () => {
  describe("Header Component", () => {
    it("문항 정보가 렌더링이 된다.", () => {
      const rendered = render(
        <Wrapper>
          <Header />
        </Wrapper>,
      );
      const question = questionMockData[0];

      expect(rendered.getByText(question.question)).toBeInTheDocument();
      expect(rendered.getByText(question.category)).toBeInTheDocument();
      expect(rendered.getByText(question.difficulty)).toBeInTheDocument();
    });
  });

  describe("AnswerList Component", () => {
    beforeEach(() => {
      render(
        <Wrapper>
          <AnswerList />
        </Wrapper>,
      );
    });

    it("답안 리스트가 렌더링 된다.", () => {
      const question = questionMockData[0];

      expect(screen.getByText(question.answers[0])).toBeInTheDocument();
      expect(screen.getByText(question.answers[1])).toBeInTheDocument();
      expect(screen.getByText(question.answers[2])).toBeInTheDocument();
      expect(screen.getByText(question.answers[3])).toBeInTheDocument();
    });

    it("답안을 클릭하면 question 데이터가 localStorage에 저장된다.", async () => {
      const question = questionMockData[0];

      const selectedAnswer = screen.getByText(question.answers[0]);
      fireEvent.click(selectedAnswer);

      await waitFor(async () => {
        const results = await getQuestionResults();
        return expect(results?.[0].selectedAnswer).toBe(selectedAnswer.textContent);
      });
    });

    it("답안을 클릭하면 정답과 오답에 색상이 추가되어 구분할 수 있다.", () => {
      const question = questionMockData[0];

      const selectedAnswer = screen.getByText(question.answers[0]);
      const correctAnswer = screen.getByText(question.correctAnswer);

      fireEvent.click(selectedAnswer);

      expect(correctAnswer).toHaveStyle("backgroundColor: #add8e6");
      expect(selectedAnswer).toHaveStyle("backgroundColor: #ff4d4d");
    });

    it("선택한 답안은 변경할 수 없다.", () => {
      const question = questionMockData[0];

      const selectedAnswer = screen.getByText(question.answers[0]);
      fireEvent.click(selectedAnswer);

      const afterSelectedAnswer = screen.getByText(question.answers[1]);
      fireEvent.click(afterSelectedAnswer);

      expect(afterSelectedAnswer).not.toHaveStyle("backgroundColor: #ff4d4d");
    });
  });

  describe("Page Component", () => {
    beforeEach(() => {
      render(
        <Wrapper>
          <Page />
        </Wrapper>,
      );
    });

    it("답안을 선택하면 버튼이 활성화 된다.", () => {
      const question = questionMockData[0];

      const selectedAnswer = screen.getByText(question.answers[0]);
      fireEvent.click(selectedAnswer);

      expect(screen.getByRole("button")).not.toBeDisabled();
    });

    it("'다음 문항' 버튼을 클릭하면 다음 문항이 렌더링 된다.", () => {
      const question = questionMockData[0];
      const nextQuestion = questionMockData[1];

      const selectedAnswer = screen.getByText(question.answers[0]);
      fireEvent.click(selectedAnswer);
      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(screen.getByText(nextQuestion.question)).toBeInTheDocument();
      expect(screen.getByText(nextQuestion.category)).toBeInTheDocument();
      expect(screen.getByText(nextQuestion.difficulty)).toBeInTheDocument();
      expect(screen.getByText(nextQuestion.answers[0])).toBeInTheDocument();
      expect(screen.getByText(nextQuestion.answers[1])).toBeInTheDocument();
      expect(screen.getByText(nextQuestion.answers[2])).toBeInTheDocument();
      expect(screen.getByText(nextQuestion.answers[3])).toBeInTheDocument();
    });

    it("마지막 문항에서 버튼의 이름이 '다음 문항'에서 '결과 보기'로 변경된다.", () => {
      const button = screen.getByRole("button");
      expect(button.textContent).toBe("다음 문항");

      questionMockData.forEach((_, index) => {
        const question = questionMockData[index];
        const selectedAnswer = screen.getByText(question.answers[0]);
        fireEvent.click(selectedAnswer);
        if (QUESTION_LAST_STEP > index + 1) {
          fireEvent.click(button);
        }
      });

      expect(button.textContent).toBe("결과 보기");
    });
  });
});

const questionMockData: Question[] = [
  {
    category: "Entertainment: Cartoon & Animations",
    correctAnswer: "Bambi",
    difficulty: "easy",
    incorrectAnswers: ["Cinderella", "Pinocchio", "The Jungle Book"],
    answers: ["Cinderella", "Pinocchio", "The Jungle Book", "Bambi"],
    question: "The song &#039;Little April Shower&#039; features in which Disney cartoon film?",
    type: "multiple",
  },
  {
    category: "Entertainment: Video Games",
    correctAnswer: "SK Gaming",
    difficulty: "medium",
    incorrectAnswers: ["Team Liquid", "Fnatic", "Virtus.pro"],
    answers: ["SK Gaming", "Team Liquid", "Fnatic", "Virtus.pro"],
    question: "Which CS:GO eSports team won the major event ESL One Cologne 2016?",
    type: "multiple",
  },
  {
    category: "Entertainment: Cartoon & Animations",
    correctAnswer: "Bambi",
    difficulty: "easy",
    incorrectAnswers: ["Cinderella", "Pinocchio", "The Jungle Book"],
    answers: ["Cinderella", "Pinocchio", "The Jungle Book", "Bambi"],
    question: "The song &#039;Little April Shower&#039; features in which Disney cartoon film?",
    type: "multiple",
  },
  {
    category: "Entertainment: Video Games",
    correctAnswer: "SK Gaming",
    difficulty: "medium",
    incorrectAnswers: ["Team Liquid", "Fnatic", "Virtus.pro"],
    answers: ["SK Gaming", "Team Liquid", "Fnatic", "Virtus.pro"],
    question: "Which CS:GO eSports team won the major event ESL One Cologne 2016?",
    type: "multiple",
  },
  {
    category: "Entertainment: Cartoon & Animations",
    correctAnswer: "Bambi",
    difficulty: "easy",
    incorrectAnswers: ["Cinderella", "Pinocchio", "The Jungle Book"],
    answers: ["Cinderella", "Pinocchio", "The Jungle Book", "Bambi"],
    question: "The song &#039;Little April Shower&#039; features in which Disney cartoon film?",
    type: "multiple",
  },
  {
    category: "Entertainment: Video Games",
    correctAnswer: "SK Gaming",
    difficulty: "medium",
    incorrectAnswers: ["Team Liquid", "Fnatic", "Virtus.pro"],
    answers: ["SK Gaming", "Team Liquid", "Fnatic", "Virtus.pro"],
    question: "Which CS:GO eSports team won the major event ESL One Cologne 2016?",
    type: "multiple",
  },
  {
    category: "Entertainment: Cartoon & Animations",
    correctAnswer: "Bambi",
    difficulty: "easy",
    incorrectAnswers: ["Cinderella", "Pinocchio", "The Jungle Book"],
    answers: ["Cinderella", "Pinocchio", "The Jungle Book", "Bambi"],
    question: "The song &#039;Little April Shower&#039; features in which Disney cartoon film?",
    type: "multiple",
  },
  {
    category: "Entertainment: Video Games",
    correctAnswer: "SK Gaming",
    difficulty: "medium",
    incorrectAnswers: ["Team Liquid", "Fnatic", "Virtus.pro"],
    answers: ["SK Gaming", "Team Liquid", "Fnatic", "Virtus.pro"],
    question: "Which CS:GO eSports team won the major event ESL One Cologne 2016?",
    type: "multiple",
  },
  {
    category: "Entertainment: Cartoon & Animations",
    correctAnswer: "Bambi",
    difficulty: "easy",
    incorrectAnswers: ["Cinderella", "Pinocchio", "The Jungle Book"],
    answers: ["Cinderella", "Pinocchio", "The Jungle Book", "Bambi"],
    question: "The song &#039;Little April Shower&#039; features in which Disney cartoon film?",
    type: "multiple",
  },
  {
    category: "Entertainment: Video Games",
    correctAnswer: "SK Gaming",
    difficulty: "medium",
    incorrectAnswers: ["Team Liquid", "Fnatic", "Virtus.pro"],
    answers: ["SK Gaming", "Team Liquid", "Fnatic", "Virtus.pro"],
    question: "Which CS:GO eSports team won the major event ESL One Cologne 2016?",
    type: "multiple",
  },
];
