import { createContext, useContext } from "react";

export type ResultPresenterResult = ReturnType<typeof useResultPresenter>;
export const useResultPresenter = () => {
  return {};
};

export const ResultPresenterContext = createContext({} as ResultPresenterResult);
export const useResultPresenterContext = () => {
  return useContext(ResultPresenterContext);
};
