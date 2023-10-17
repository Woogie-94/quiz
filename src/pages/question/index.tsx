import Page from "./components/Page";
import InteractorProvider from "./interactor";
import { useQuestionInteractor } from "./interactor/Question.interactor";
import PresenterProvider from "./presenter";

const Question = () => {
  const questionInteractor = useQuestionInteractor();

  return (
    <div data-testid="question-page">
      <InteractorProvider interactor={questionInteractor}>
        <PresenterProvider>
          <Page />
        </PresenterProvider>
      </InteractorProvider>
    </div>
  );
};

export default Question;
