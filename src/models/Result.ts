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

  private formattedTime(ms: number) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    let time = "";
    if (hours) time += `${hours}시`;
    if (minutes) time += `${minutes}분`;
    time += `${seconds}초`;

    return time;
  }

  setTotalElapsedTime(start: Date, end: Date) {
    const diffMs = end.getTime() - start.getTime();
    this.totalElapsedTime = this.formattedTime(diffMs);
  }
}

export default QuizResult;
