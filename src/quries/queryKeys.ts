export const QUERY_KEY_QUIZ_PREFIX = ["quiz"];

const QUERY_KEY = {
  questions: [...QUERY_KEY_QUIZ_PREFIX, "questions"],
  questionResults: [...QUERY_KEY_QUIZ_PREFIX, "questionResults"],
};

export default QUERY_KEY;
