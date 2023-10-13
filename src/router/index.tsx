import { createBrowserRouter } from "react-router-dom";

import QuizPage from "../pages/quiz";
import { PATH_ROOT } from "../constants/path";

const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    element: <QuizPage />,
  },
]);

export default router;
