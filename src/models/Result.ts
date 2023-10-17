import Question from "./Question";

export interface QuestionResult extends Question {
  selectedAnswer: string;
}

class QuizResult {
  questions: QuestionResult[];
  correctCount: number;
  incorrectCount: number;
  totalElapsedTime: string;

  constructor(data: QuestionResult[]) {
    this.questions = data;
    this.correctCount = this.calculateCorrectCount(data);
    this.incorrectCount = this.calculateIncorrectCount(data);
    this.totalElapsedTime = "";
  }

  private calculateCorrectCount(data: QuestionResult[]) {
    return data.filter(item => item.selectedAnswer === item.correctAnswer).length;
  }

  private calculateIncorrectCount(data: QuestionResult[]) {
    return data.filter(item => item.selectedAnswer !== item.correctAnswer).length;
  }

  private formattedTime(date: Date) {
    const normalizedTime = Intl.DateTimeFormat("default", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }).format(date);

    const [hour, minute, second] = normalizedTime.split(":").map(item => (+item >= 24 ? "00" : item));

    return `${hour}:${minute}:${second}`;
  }

  setTotalElapsedTime(start: Date, end: Date) {
    const time = end.getTime() - start.getTime();
    this.totalElapsedTime = this.formattedTime(new Date(time));
  }
}

export default QuizResult;
