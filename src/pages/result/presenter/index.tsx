import { ReactNode } from "react";
import { ResultPresenterContext, useResultPresenter } from "./Result.presenter";

interface Props {
  children: ReactNode;
}

const PresenterProvider = ({ children }: Props) => {
  const ResultPresenter = useResultPresenter();

  return <ResultPresenterContext.Provider value={ResultPresenter}>{children}</ResultPresenterContext.Provider>;
};

export default PresenterProvider;
