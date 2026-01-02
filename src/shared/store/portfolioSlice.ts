// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {Portfolio} from '../types/portfolio';
// import {Investment} from '../types/investment';

// interface PortfolioState {
//   portfolio: Portfolio | null;
//   investments: Investment[];
//   selectedInvestment: Investment | null;
//   loading: boolean;
//   error: string | null;
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
//   filters: {
//     status?: string;
//     productType?: string;
//     searchTerm?: string;
//   };
// }

// const initialState: PortfolioState = {
//   portfolio: null,
//   investments: [],
//   selectedInvestment: null,
//   loading: false,
//   error: null,
//   pagination: {
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0,
//   },
//   filters: {},
// };

// const portfolioSlice = createSlice({
//   name: 'portfolio',
//   initialState,
//   reducers: {
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//     setPortfolio: (state, action: PayloadAction<Portfolio>) => {
//       state.portfolio = action.payload;
//       state.investments = action.payload.investments;
//       state.error = null;
//     },
//     setInvestments: (state, action: PayloadAction<Investment[]>) => {
//       state.investments = action.payload;
//       state.error = null;
//     },
//     setSelectedInvestment: (state, action: PayloadAction<Investment | null>) => {
//       state.selectedInvestment = action.payload;
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     setPagination: (
//       state,
//       action: PayloadAction<{ page: number; limit: number; total: number }>
//     ) => {
//       state.pagination = {
//         ...state.pagination,
//         ...action.payload,
//         totalPages: Math.ceil(action.payload.total / action.payload.limit),
//       };
//     },
//     setFilters: (state, action: PayloadAction<PortfolioState['filters']>) => {
//       state.filters = { ...state.filters, ...action.payload };
//       state.pagination.page = 1;
//     },
//     clearFilters: (state) => {
//       state.filters = {};
//       state.pagination.page = 1;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//     addInvestment: (state, action: PayloadAction<Investment>) => {
//       state.investments.push(action.payload);
//       if (state.portfolio) {
//         state.portfolio.investments.push(action.payload);
//         state.portfolio.summary.totalInvested += action.payload.amount;
//         state.portfolio.summary.totalInvestments += 1;
//       }
//     },
//     updateInvestment: (state, action: PayloadAction<Investment>) => {
//       const index = state.investments.findIndex((i) => i.id === action.payload.id);
//       if (index !== -1) {
//         state.investments[index] = action.payload;
//       }
//       if (state.selectedInvestment?.id === action.payload.id) {
//         state.selectedInvestment = action.payload;
//       }
//     },
//     removeInvestment: (state, action: PayloadAction<string>) => {
//       const investment = state.investments.find((i) => i.id === action.payload);
//       if (investment && state.portfolio) {
//         state.portfolio.summary.totalInvested -= investment.amount;
//         state.portfolio.summary.totalInvestments -= 1;
//       }
//       state.investments = state.investments.filter((i) => i.id !== action.payload);
//     },
//   },
// });

// export const {
//   setLoading,
//   setPortfolio,
//   setInvestments,
//   setSelectedInvestment,
//   setError,
//   setPagination,
//   setFilters,
//   clearFilters,
//   clearError,
//   addInvestment,
//   updateInvestment,
//   removeInvestment,
// } = portfolioSlice.actions;
// export default portfolioSlice.reducer;
