export const AppRoutes = {
  HOME: "/",
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];

export const ApiEndpoints = {
  // Add your API endpoints here
} as const;

export type ApiEndpoint = (typeof ApiEndpoints)[keyof typeof ApiEndpoints];
