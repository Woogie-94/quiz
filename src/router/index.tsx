import { createBrowserRouter } from "react-router-dom";

import { PATH_ROOT } from "../constants/path";
import Main from "../pages/main";

const router = createBrowserRouter([
  {
    path: PATH_ROOT,
    element: <Main />,
  },
]);

export default router;