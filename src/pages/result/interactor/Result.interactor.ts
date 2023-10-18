import { createContext, useContext } from "react";
import { getQuizEndTime, getQuizStartTime } from "../../../services/quiz";
import useQuizResultQuery from "../../../queries/useQuizResultQuery";

export type ResultInteractorResult = ReturnType<typeof useResultInteractor>;
export const useResultInteractor = () => {
  const { data } = useQuizResultQuery();

  const startTime = getQuizStartTime();
  const endTime = getQuizEndTime();

  data?.setTotalElapsedTime(startTime, endTime);

  return { result: data };
};

export const ResultInteractorContext = createContext({} as ResultInteractorResult);
export const useResultInteractorContext = () => {
  return useContext(ResultInteractorContext);
};
