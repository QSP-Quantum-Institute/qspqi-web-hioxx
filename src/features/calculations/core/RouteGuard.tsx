import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useHioxxSessionStore } from "../../../stores/hioxxSessionStore";
import { canAccessSummary, canAccessResults } from "./guards";
import { isValidCalculationType } from "./registry";
import type { CalculationType } from "./types";
import { AppRoutes } from "../../../common/enums";

interface ProfileGuardProps {
  children: ReactNode;
}

export function ProfileGuard({ children }: ProfileGuardProps) {
  const { profile } = useHioxxSessionStore();

  if (!canAccessSummary(profile)) {
    return <Navigate to={AppRoutes.HOME} replace />;
  }

  return <>{children}</>;
}

interface ResultsGuardProps {
  children: ReactNode;
}

export function ResultsGuard({ children }: ResultsGuardProps) {
  const { profile } = useHioxxSessionStore();
  const location = useLocation();
  const typeParam = location.pathname.split("/").pop() ?? "";

  if (!isValidCalculationType(typeParam)) {
    return <Navigate to={AppRoutes.CALCULATION_SELECT} replace />;
  }

  if (!canAccessResults(typeParam as CalculationType, profile)) {
    return <Navigate to={AppRoutes.CALCULATION_SELECT} replace />;
  }

  return <>{children}</>;
}
