import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizInteractorContext } from "../interactor/Quiz.interactor";
import { PATH_QUESTION } from "../../../constants/path";
import { QUESTION_RESPONCE_CODE__SUCCESS } from "../../../constants/question";

export type QuizPresenterResult = ReturnType<typeof useQuizPresenter>;
export const useQuizPresenter = () => {
  const { fetchQuestion } = useQuizInteractorContext();
  const navigation = useNavigate();

  const onStartClick = () => {
    // Note(eunwook): openAPI가 요청이 실패해도 200 status로 내려옵니다. 대신 response_code로 에러를 판별하도록 가이드 되어 있습니다.
    fetchQuestion().then(data => {
      if (data?.responseCode === QUESTION_RESPONCE_CODE__SUCCESS) {
        navigation(`${PATH_QUESTION}?step=1`, { state: { questions: data?.questions } });
      } else {
        // toast
      }
    });
  };

  return {
    onStartClick,
  };
};

const initialQuizPresenter: QuizPresenterResult = {
  onStartClick: () => {},
};

export const QuizPresenterContext = createContext(initialQuizPresenter);
export const useQuizPresenterContext = () => {
  return useContext(QuizPresenterContext);
};
