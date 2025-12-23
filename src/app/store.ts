import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/modules/open/auth/store/authSlice';
import productReducer from '@shared/store/productSlice';
import portfolioReducer from '@shared/store/portfolioSlice';
import transactionReducer from '@shared/store/transactionSlice';
import uiReducer from '@shared/store/uiSlice';
import RtkQueryService from '@shared/services/rtkService';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    portfolio: portfolioReducer,
    transactions: transactionReducer,
    ui: uiReducer,
    [RtkQueryService.reducerPath]: RtkQueryService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
      },
    }).concat(RtkQueryService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
