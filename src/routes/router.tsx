import { createBrowserRouter, Navigate } from "react-router-dom";
import { IntakePage } from "./pages/IntakePage";
import { SummaryPage } from "../features/summary/SummaryPage";
import { CalculationSelectPage } from "../features/calculation-selector/CalculationSelectPage";
import { ResultsPage } from "./pages/ResultsPage";
import {
  ProfileGuard,
  ResultsGuard,
} from "../features/calculations/core/RouteGuard";
import { AppRoutes } from "../common/enums";

export const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <IntakePage />,
  },
  {
    path: AppRoutes.SUMMARY,
    element: (
      <ProfileGuard>
        <SummaryPage />
      </ProfileGuard>
    ),
  },
  {
    path: AppRoutes.CALCULATION_SELECT,
    element: (
      <ProfileGuard>
        <CalculationSelectPage />
      </ProfileGuard>
    ),
  },
  {
    path: `${AppRoutes.CALCULATION}/:type`,
    element: (
      <ProfileGuard>
        <ResultsGuard>
          <ResultsPage />
        </ResultsGuard>
      </ProfileGuard>
    ),
  },
  {
    path: "*",
    element: <Navigate to={AppRoutes.HOME} replace />,
  },
]);
