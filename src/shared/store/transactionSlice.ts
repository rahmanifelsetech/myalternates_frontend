import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionFilter } from '../../types';

interface TransactionState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  selectedTransaction: Transaction | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: TransactionFilter;
}

const initialState: TransactionState = {
  transactions: [],
  filteredTransactions: [],
  selectedTransaction: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {},
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      state.filteredTransactions = action.payload;
      state.error = null;
    },
    setSelectedTransaction: (state, action: PayloadAction<Transaction | null>) => {
      state.selectedTransaction = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPagination: (
      state,
      action: PayloadAction<{ page: number; limit: number; total: number }>
    ) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
        totalPages: Math.ceil(action.payload.total / action.payload.limit),
      };
    },
    setFilters: (state, action: PayloadAction<TransactionFilter>) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters
      state.filteredTransactions = state.transactions.filter((transaction) => {
        if (action.payload.type && transaction.type !== action.payload.type) return false;
        if (action.payload.status && transaction.status !== action.payload.status) return false;
        if (
          action.payload.startDate &&
          new Date(transaction.transactionDate) < new Date(action.payload.startDate)
        )
          return false;
        if (
          action.payload.endDate &&
          new Date(transaction.transactionDate) > new Date(action.payload.endDate)
        )
          return false;
        if (
          action.payload.searchTerm &&
          !transaction.description.toLowerCase().includes(action.payload.searchTerm.toLowerCase()) &&
          !transaction.referenceNumber.toLowerCase().includes(action.payload.searchTerm.toLowerCase())
        )
          return false;
        return true;
      });
      state.pagination.page = 1;
    },
    clearFilters: (state) => {
      state.filters = {};
      state.filteredTransactions = state.transactions;
      state.pagination.page = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      state.filteredTransactions.unshift(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
      if (state.selectedTransaction?.id === action.payload.id) {
        state.selectedTransaction = action.payload;
      }
    },
  },
});

export const {
  setLoading,
  setTransactions,
  setSelectedTransaction,
  setError,
  setPagination,
  setFilters,
  clearFilters,
  clearError,
  addTransaction,
  updateTransaction,
} = transactionSlice.actions;
export default transactionSlice.reducer;
