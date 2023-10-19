import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizInteractorContext } from "../interactor/Quiz.interactor";
import { PATH_QUESTION } from "../../../constants/path";
import { QUESTION_RESPONSE_CODE__SUCCESS } from "../../../constants/question";
import useToast from "../../../hooks/useToast";
import { setQuizStartTime } from "../../../services/quiz";

export type QuizPresenterResult = ReturnType<typeof useQuizPresenter>;
export const useQuizPresenter = () => {
  const { isLoading, fetchQuestion, resetQuestionResults } = useQuizInteractorContext();
  const navigation = useNavigate();

  const { show } = useToast();

  const onStartClick = () => {
    // Note(eunwook): openAPI가 요청이 실패해도 200 status로 내려옵니다. 대신 response_code로 에러를 판별하도록 가이드 되어 있습니다.
    fetchQuestion().then(data => {
      if (data?.responseCode === QUESTION_RESPONSE_CODE__SUCCESS) {
        setQuizStartTime();
        resetQuestionResults();
        navigation(`${PATH_QUESTION}?step=1`, { state: { questions: data?.questions } });
      } else {
        show({ message: `요청이 실패했습니다. (code-${data?.responseCode})` });
      }
    });
  };

  return {
    isLoading,
    onStartClick,
  };
};

export const QuizPresenterContext = createContext({} as QuizPresenterResult);
export const useQuizPresenterContext = () => {
  return useContext(QuizPresenterContext);
};
