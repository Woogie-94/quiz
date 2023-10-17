import { createContext, useContext } from "react";
import { getQuizEndTime, getQuizStartTime } from "../../../services/quiz";
import useQuizResultQuery from "../../../quries/useQuizResultQuery";

export type ResultInteractorResult = ReturnType<typeof useResultInteractor>;
export const useResultInteractor = () => {
  const { data } = useQuizResultQuery();

  (async () => {
    const startTime = await getQuizStartTime();
    const endTime = await getQuizEndTime();

    data?.setTotalElapsedTime(startTime, endTime);
  })();

  return { result: data };
};

export const ResultInteractorContext = createContext({} as ResultInteractorResult);
export const useResultInteractorContext = () => {
  return useContext(ResultInteractorContext);
};
