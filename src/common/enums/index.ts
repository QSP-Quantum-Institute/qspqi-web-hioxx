export const AppRoutes = {
  HOME: "/",
  SUMMARY: "/resumen",
  CALCULATION_SELECT: "/calculo",
  CALCULATION: "/calculo",
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];
