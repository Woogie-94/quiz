import Page from "./components/Page";
import InteractorProvider from "./interactor";
import { useQuestionInteractor } from "./interactor/Question.interactor";
import PresenterProvider from "./presenter";

const Question = () => {
  const questionInteractor = useQuestionInteractor();

  return (
    <InteractorProvider interactor={questionInteractor}>
      <PresenterProvider>
        <Page />
      </PresenterProvider>
    </InteractorProvider>
  );
};

export default Question;
