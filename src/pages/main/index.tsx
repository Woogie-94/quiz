import Page from "./components/Page";
import InteractorProvider from "./interactor";
import { useQuizInteractor } from "./interactor/Quiz.interactor";
import PresenterProvider from "./presenter";

const Main = () => {
  const quizInteractor = useQuizInteractor();

  return (
    <InteractorProvider interactor={quizInteractor}>
      <PresenterProvider>
        <Page />
      </PresenterProvider>
    </InteractorProvider>
  );
};

export default Main;
