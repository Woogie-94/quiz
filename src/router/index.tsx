import { createBrowserRouter } from "react-router-dom";

import { PATH_QUESTION, PATH_ROOT } from "../constants/path";
import Main from "../pages/main";
import Question from "../pages/question";

const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    element: <Main />,
  },
  {
    path: PATH_QUESTION,
    element: <Question />,
  },
]);

export default router;
