// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from './useRedux';
// import { setLoading, setProducts, setError } from '../store/slices/productSlice';
// import productService from '../services/api/productService';
// import { ProductFilter, PaginationParams } from '../types';

// export const useProducts = () => {
//   const dispatch = useAppDispatch();
//   const { products, filteredProducts, loading, error, pagination, filters } = useAppSelector(
//     (state) => state.products
//   );

//   const loadProducts = async (params: Partial<PaginationParams & ProductFilter> = {}) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await productService.getAll(params);
//       if (response.success && response.data) {
//         dispatch(setProducts(response.data.data));
//       }
//     } catch (err: any) {
//       dispatch(setError(err.message || 'Failed to load products'));
//     }
//   };

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   return {
//     products,
//     filteredProducts,
//     loading,
//     error,
//     pagination,
//     filters,
//     loadProducts,
//   };
// };
