import { createContext, useContext } from "react";
import { useResultInteractorContext } from "../interactor/Result.interactor";

export type ResultPresenterResult = ReturnType<typeof useResultPresenter>;
export const useResultPresenter = () => {
  const { result } = useResultInteractorContext();

  return { result };
};

export const ResultPresenterContext = createContext({} as ResultPresenterResult);
export const useResultPresenterContext = () => {
  return useContext(ResultPresenterContext);
};
