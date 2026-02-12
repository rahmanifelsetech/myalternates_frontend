import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@shared/types/user';

/**
 * Extended user details based on appType
 * Response from /auth/me endpoint with personId and appType
 * 
 * For ADMIN: Holds person details
 * For INVESTOR: Holds investor details
 * For DISTRIBUTOR: Holds distributor details
 */
export interface UserDetails {
  id: string;
  userId: string;
  personId: string;
  // Person data (common for all types)
  person?: {
    id: string;
    fullName: string;
    pan?: string;
    dob?: string;
    mobile?: string;
    email?: string;
    gender?: string;
    isMinor: boolean;
  };
  // when appType= Investor specific (presentINVESTOR)
  investor?: {
    id: string;
    myaltCode: string;
    primaryPersonId: string;
    primaryPan?: string;
    residentialStatus?: string;
    subStatus?: string;
    inceptionDate?: string;
    isActive: boolean;
    investmentAccounts?: {
      id: string;
      modeOfHolding: string;
      isActive: boolean;
    }[];
  };
  // Distributor specific (present when appType=DISTRIBUTOR)
  distributor?: {
    id: string;
    userId: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    companyName?: string;
    arnNumber?: string;
    subBrokerCode?: string;
    isActive: boolean;
  };
}

interface AuthState {
  user: User | null;
  details: UserDetails | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  details: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('authToken') : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },
    setDetails: (state, action: PayloadAction<UserDetails>) => {
      state.details = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', action.payload);
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.details = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setUser, setDetails, setToken, setError, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
