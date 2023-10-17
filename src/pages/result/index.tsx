import Page from "./components/Page";
import InteractorProvider from "./interactor";
import { useResultInteractor } from "./interactor/Result.interactor";
import PresenterProvider from "./presenter";

const Result = () => {
  const resultInteractor = useResultInteractor();

  return (
    <InteractorProvider interactor={resultInteractor}>
      <PresenterProvider>
        <Page />
      </PresenterProvider>
    </InteractorProvider>
  );
};

export default Result;
