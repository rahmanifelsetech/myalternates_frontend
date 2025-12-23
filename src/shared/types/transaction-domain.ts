/**
 * Transaction Types
 */

export type TransactionType = 'INVESTMENT' | 'REDEMPTION' | 'DIVIDEND' | 'TRANSFER' | 'WITHDRAWAL';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'PROCESSING';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  productId?: string;
  productName?: string;
  description: string;
  transactionDate: string;
  completedDate?: string;
  failureReason?: string;
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFilter {
  type?: TransactionType;
  status?: TransactionStatus;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}
