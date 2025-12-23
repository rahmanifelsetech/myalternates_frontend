import type { ListResponse, SingleResponse, EmptyResponse } from './api';

/**
 * Portfolio Domain Model
 */
export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  description?: string;
  totalValue: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Portfolio Response Types
 * Domain-specific responses extending base API response types
 */
export type GetPortfoliosResponse = ListResponse<Portfolio>;

export type GetPortfolioResponse = SingleResponse<Portfolio>;

export type CreatePortfolioResponse = SingleResponse<Portfolio>;

export type UpdatePortfolioResponse = SingleResponse<Portfolio>;

export type DeletePortfolioResponse = EmptyResponse;

/**
 * Portfolio Request Payloads
 */
export interface CreatePortfolioPayload {
  name: string;
  description?: string;
  [key: string]: any;
}

export interface UpdatePortfolioPayload {
  name?: string;
  description?: string;
  [key: string]: any;
}
