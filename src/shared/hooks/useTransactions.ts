// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from './useRedux';
// import { setLoading, setTransactions, setError } from '../store/slices/transactionSlice';
// import transactionService from '../services/api/transactionService';
// import { TransactionFilter, PaginationParams } from '../types';

// export const useTransactions = (userId: string | undefined) => {
//   const dispatch = useAppDispatch();
//   const { transactions, loading, error, pagination } = useAppSelector(
//     (state) => state.transactions
//   );

//   const loadTransactions = async (id: string, params: Partial<PaginationParams & TransactionFilter> = {}) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await transactionService.getByUserId(id, params);
//       if (response.success && response.data) {
//         dispatch(setTransactions(response.data.data));
//       }
//     } catch (err: any) {
//       dispatch(setError(err.message || 'Failed to load transactions'));
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       loadTransactions(userId);
//     }
//   }, [userId]);

//   return { transactions, loading, error, pagination, loadTransactions };
// };
