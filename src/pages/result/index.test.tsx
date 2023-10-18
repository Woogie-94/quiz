import { describe, expect, it } from "vitest";
import { ResultInteractorResult } from "./interactor/Result.interactor";
import QuizResult, { QuestionResult } from "../../models/Result";
import InteractorProvider from "./interactor";
import PresenterProvider from "./presenter";
import { ReactElement } from "react";
import Score from "./components/Score";
import { render } from "@testing-library/react";
import TotalTime from "./components/TotalTime";
import "@testing-library/jest-dom";

const useFakeInteractor = (data: QuestionResult[]): ResultInteractorResult => {
  const result = new QuizResult(data);

  const startTime = new Date("Wed Oct 18 2023 16:17:03");
  const endTime = new Date("Wed Oct 18 2023 18:21:16");
  result?.setTotalElapsedTime(startTime, endTime);

  return {
    result,
  };
};

const Wrapper = ({ children }: { children: ReactElement }) => {
  return (
    <InteractorProvider interactor={useFakeInteractor(resultsMockData)}>
      <PresenterProvider>{children}</PresenterProvider>
    </InteractorProvider>
  );
};

describe("Result Page", () => {
  describe("Score Component", () => {
    it("정답 수와 오답 수가 렌더링 된다.", () => {
      const rendered = render(
        <Wrapper>
          <Score />
        </Wrapper>,
      );

      expect(rendered.getByText("정답 2개")).toBeInTheDocument();
      expect(rendered.getByText("오답 8개")).toBeInTheDocument();
    });
  });

  describe("TotalTime Component", () => {
    it("총 소요 시간이 런더링 된다.", () => {
      const rendered = render(
        <Wrapper>
          <TotalTime />
        </Wrapper>,
      );

      expect(rendered.getByText("2시 4분 13초")).toBeInTheDocument();
    });
  });
});

const resultsMockData: QuestionResult[] = [
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "medium",
    question: "Scotch whisky and Drambuie make up which cocktail?",
    correctAnswer: "Rusty Nail",
    incorrectAnswers: ["Screwdriver", "Sex on the Beach", "Manhattan"],
    answers: ["Screwdriver", "Sex on the Beach", "Manhattan", "Rusty Nail"],
    selectedAnswer: "Manhattan",
  },
  {
    category: "Entertainment: Books",
    type: "multiple",
    difficulty: "hard",
    question: "In the &quot;Harry Potter&quot; series, what is Headmaster Dumbledore&#039;s full name?",
    correctAnswer: "Albus Percival Wulfric Brian Dumbledore",
    incorrectAnswers: [
      "Albus Valum Jetta Mobius Dumbledore",
      "Albus James Lunae Otto Dumbledore",
      "Albus Valencium Horatio Kul Dumbledore",
    ],
    answers: [
      "Albus Valum Jetta Mobius Dumbledore",
      "Albus Percival Wulfric Brian Dumbledore",
      "Albus James Lunae Otto Dumbledore",
      "Albus Valencium Horatio Kul Dumbledore",
    ],
    selectedAnswer: "Albus Percival Wulfric Brian Dumbledore",
  },
  {
    category: "Science: Mathematics",
    type: "multiple",
    difficulty: "hard",
    question: "The decimal number 31 in hexadecimal would be what?",
    correctAnswer: "1F",
    incorrectAnswers: ["3D", "2E", "1B"],
    answers: ["3D", "2E", "1F", "1B"],
    selectedAnswer: "1B",
  },
  {
    category: "Entertainment: Music",
    type: "multiple",
    difficulty: "easy",
    question: "According to the American rapper Nelly, what should you do when its hot in here?",
    correctAnswer: "Take off all your clothes",
    incorrectAnswers: ["Take a cool shower", "Drink some water", "Go skinny dipping"],
    answers: ["Take a cool shower", "Drink some water", "Go skinny dipping", "Take off all your clothes"],
    selectedAnswer: "Drink some water",
  },
  {
    category: "Sports",
    type: "multiple",
    difficulty: "medium",
    question: "What national team won the 2016 edition of UEFA European Championship?",
    correctAnswer: "Portugal",
    incorrectAnswers: ["France", "Germany", "England"],
    answers: ["France", "Germany", "Portugal", "England"],
    selectedAnswer: "France",
  },
  {
    category: "Geography",
    type: "multiple",
    difficulty: "medium",
    question: "Which of these countries is the smallest by population?",
    correctAnswer: "Norway",
    incorrectAnswers: ["Slovakia", "Finland", "Hong Kong"],
    answers: ["Slovakia", "Norway", "Finland", "Hong Kong"],
    selectedAnswer: "Finland",
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question: "Which &quot;Fallout: New Vegas&quot; quest is NOT named after a real-life song?",
    correctAnswer: "They Went That-a-Way",
    incorrectAnswers: ["Come Fly With Me", "Ain&#039;t That a Kick in the Head", "Ring-a-Ding Ding"],
    answers: ["Come Fly With Me", "They Went That-a-Way", "Ain&#039;t That a Kick in the Head", "Ring-a-Ding Ding"],
    selectedAnswer: "They Went That-a-Way",
  },
  {
    category: "Geography",
    type: "multiple",
    difficulty: "medium",
    question: "What continent is the country Lesotho in?",
    correctAnswer: "Africa",
    incorrectAnswers: ["Asia", "South America", "Europe"],
    answers: ["Asia", "Africa", "South America", "Europe"],
    selectedAnswer: "Europe",
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question: "What major programming language does Unreal Engine 4 use?",
    correctAnswer: "C++",
    incorrectAnswers: ["Assembly", "C#", "ECMAScript"],
    answers: ["Assembly", "C++", "C#", "ECMAScript"],
    selectedAnswer: "Assembly",
  },
  {
    category: "Science & Nature",
    type: "multiple",
    difficulty: "medium",
    question: "What are the smallest blood vessels in the human body?",
    correctAnswer: "Capillaries",
    incorrectAnswers: ["Arterioles", "Veinules", "Lymphatics"],
    answers: ["Arterioles", "Veinules", "Capillaries", "Lymphatics"],
    selectedAnswer: "Lymphatics",
  },
];
