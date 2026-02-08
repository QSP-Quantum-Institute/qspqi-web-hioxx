import { createBrowserRouter } from "react-router-dom";
import { HioxxPage } from "./pages/HioxxPage";
import { AppRoutes } from "../common/enums";

export const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <HioxxPage />,
  },
]);
