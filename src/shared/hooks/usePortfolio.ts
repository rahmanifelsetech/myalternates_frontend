// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from './useRedux';
// import { setLoading, setPortfolio, setError } from '../store/slices/portfolioSlice';
// import portfolioService from '../services/api/portfolioService';

// export const usePortfolio = (userId: string | undefined) => {
//   const dispatch = useAppDispatch();
//   const { portfolio, investments, loading, error } = useAppSelector((state) => state.portfolio);

//   const loadPortfolio = async (id: string) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await portfolioService.getPortfolio(id);
//       if (response.success && response.data) {
//         dispatch(setPortfolio(response.data));
//       }
//     } catch (err: any) {
//       dispatch(setError(err.message || 'Failed to load portfolio'));
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       loadPortfolio(userId);
//     }
//   }, [userId]);

//   return { portfolio, investments, loading, error, loadPortfolio };
// };
