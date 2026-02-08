export type { ColorKey, ColorShade } from "../constants/colors";

export interface ApiResponse<T> {
  data?: T;
  total?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RouteConfig {
  path: string;
  label: string;
  component?: React.ComponentType;
}
