import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/modules/open/auth/store/authSlice';
// import productReducer from '@shared/store/productSlice';
// import portfolioReducer from '@shared/store/portfolioSlice';
// import transactionReducer from '@shared/store/transactionSlice';
import uiReducer from '@shared/store/uiSlice';
import RtkQueryService from '@shared/services/rtkService';

const rootReducer = combineReducers({
  auth: authReducer,
  // products: productReducer,
  // portfolio: portfolioReducer,
  // transactions: transactionReducer,
  ui: uiReducer,
  [RtkQueryService.reducerPath]: RtkQueryService.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'auth/setUser',
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(RtkQueryService.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
