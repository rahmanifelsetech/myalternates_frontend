import ApiService from '../ApiService';
import type {
  GetTransactionsResponse,
  GetTransactionResponse,
  CreateTransactionResponse,
  UpdateTransactionResponse,
  DeleteTransactionResponse,
  TransactionFilter,
  CreateTransactionPayload,
  UpdateTransactionPayload,
} from '@/types/transaction';
import type { PaginationParams } from '@/types/api';

export const transactionService = {
  getAll: async (params?: PaginationParams & TransactionFilter): Promise<GetTransactionsResponse> => {
    return ApiService.get<GetTransactionsResponse>('/transactions', { params });
  },

  getById: async (id: string): Promise<GetTransactionResponse> => {
    return ApiService.get<GetTransactionResponse>(`/transactions/${id}`);
  },

  getByUserId: async (userId: string, params?: PaginationParams & TransactionFilter): Promise<GetTransactionsResponse> => {
    return ApiService.get<GetTransactionsResponse>(`/transactions/user/${userId}`, { params });
  },

  getByStatus: async (status: string, params?: PaginationParams): Promise<GetTransactionsResponse> => {
    return ApiService.get<GetTransactionsResponse>(`/transactions/status/${status}`, { params });
  },

  create: async (data: CreateTransactionPayload): Promise<CreateTransactionResponse> => {
    return ApiService.post<CreateTransactionResponse>('/transactions', data);
  },

  update: async (id: string, data: UpdateTransactionPayload): Promise<UpdateTransactionResponse> => {
    return ApiService.put<UpdateTransactionResponse>(`/transactions/${id}`, data);
  },

  deleteTransaction: async (id: string): Promise<DeleteTransactionResponse> => {
    return ApiService.deleteRequest<DeleteTransactionResponse>(`/transactions/${id}`);
  },
};

export default transactionService;
