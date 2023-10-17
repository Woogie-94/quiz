import { createContext, useContext } from "react";

export type ResultInteractorResult = ReturnType<typeof useResultInteractor>;
export const useResultInteractor = () => {
  return {};
};

export const ResultInteractorContext = createContext({} as ResultInteractorResult);
export const useResultInteractorContext = () => {
  return useContext(ResultInteractorContext);
};
