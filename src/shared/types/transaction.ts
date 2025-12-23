import type { PaginatedResponse, SingleResponse, EmptyResponse } from './api';

/**
 * Transaction Domain Model
 */
export interface Transaction {
  id: string;
  userId: string;
  type: 'buy' | 'sell' | 'transfer';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

/**
 * Transaction Response Types
 * Domain-specific responses extending base API response types
 */
export type GetTransactionsResponse = PaginatedResponse<Transaction>;

export type GetTransactionResponse = SingleResponse<Transaction>;

export type CreateTransactionResponse = SingleResponse<Transaction>;

export type UpdateTransactionResponse = SingleResponse<Transaction>;

export type DeleteTransactionResponse = EmptyResponse;

/**
 * Transaction Request Payloads
 */
export interface TransactionFilter {
  type?: 'buy' | 'sell' | 'transfer';
  status?: 'pending' | 'completed' | 'failed';
  dateFrom?: string;
  dateTo?: string;
}

export interface CreateTransactionPayload {
  type: 'buy' | 'sell' | 'transfer';
  amount: number;
  [key: string]: any;
}

export interface UpdateTransactionPayload {
  [key: string]: any;
}
