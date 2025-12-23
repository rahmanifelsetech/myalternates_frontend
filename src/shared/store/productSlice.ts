import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFilter } from "@types";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: ProductFilter;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
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

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.error = null;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilters: (state, action: PayloadAction<ProductFilter>) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters
      state.filteredProducts = state.products.filter((product) => {
        if (action.payload.type && product.type !== action.payload.type) return false;
        if (action.payload.status && product.status !== action.payload.status) return false;
        if (action.payload.riskLevel && product.riskLevel !== action.payload.riskLevel) return false;
        if (action.payload.minInvestment && product.minimumInvestment < action.payload.minInvestment)
          return false;
        if (
          action.payload.maxInvestment &&
          product.minimumInvestment > action.payload.maxInvestment
        )
          return false;
        if (
          action.payload.searchTerm &&
          !product.name.toLowerCase().includes(action.payload.searchTerm.toLowerCase())
        )
          return false;
        return true;
      });
      state.pagination.page = 1;
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
    clearFilters: (state) => {
      state.filters = {};
      state.filteredProducts = state.products;
      state.pagination.page = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.filteredProducts.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.filteredProducts = state.filteredProducts.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setProducts,
  setSelectedProduct,
  setError,
  setFilters,
  setPagination,
  clearFilters,
  clearError,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;
export default productSlice.reducer;
