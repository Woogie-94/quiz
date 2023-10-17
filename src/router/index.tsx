import { createBrowserRouter } from "react-router-dom";

import { PATH_QUESTION, PATH_RESULT, PATH_ROOT } from "../constants/path";
import Main from "../pages/main";
import Question from "../pages/question";
import Result from "../pages/result";

const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    element: <Main />,
  },
  {
    path: PATH_QUESTION,
    element: <Question />,
  },
  {
    path: PATH_RESULT,
    element: <Result />,
  },
]);

export default router;
