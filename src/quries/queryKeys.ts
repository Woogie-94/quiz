export const QUERY_KEY_QUIZ_PREFIX = ["quiz"];

const QUERY_KEY = {
  questions: [...QUERY_KEY_QUIZ_PREFIX, "questions"],
  results: [...QUERY_KEY_QUIZ_PREFIX, "results"],
};

export default QUERY_KEY;
