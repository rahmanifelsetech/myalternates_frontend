import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useRedux';
import { setLoading, setUser, setToken, setError, logout as logoutAction, clearError } from '@/modules/open/auth/store/authSlice';
import authService from '@/modules/open/auth/api/authService';
import type { SignInFormData, SignUpStep1Data, SignUpStep2Data } from '@/modules/open/auth/schema/auth.schemas';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, loading, error } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!token;

  const loadCurrentUser = async () => {
    dispatch(setLoading(true));
    try {
      const response = await authService.getCurrentUser();
      if (response.data) {
        dispatch(setUser(response.data));
      }
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to load user'));
    }
  };

  /**
   * Sign in user with email and password
   */
  const signIn = async (credentials: SignInFormData) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await authService.signIn(credentials);
      if (response.data) {
        const { user: userData, access_token: authToken } = response.data;
        dispatch(setToken(authToken));
        dispatch(setUser(userData));
        return { success: true, data: userData };
      }
      throw new Error('Sign in failed');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign in';
      // Pass the full error object if available, specifically details
      const errorDetails = err.response?.data?.details || err.details;
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage, details: errorDetails };
    } finally {
      dispatch(setLoading(false));
    }
  };

  /**
   * Sign up new user (STEP 1)
   */
  const registerStep1 = async (credentials: SignUpStep1Data) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await authService.registerStep1(credentials);
      if (response.data) {
        return { success: true, data: response.data };
      }
      throw new Error('Sign up failed');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign up';
      const errorDetails = err.response?.data?.details || err.details;
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage, details: errorDetails };
    } finally {
      dispatch(setLoading(false));
    }
  };

  /**
   * Sign up new user (STEP 2)
   */
  const registerStep2 = async (formData: SignUpStep2Data, userId: string) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      // Convert form data to API payload (exclude terms from API call)
      const payload = {
        userId,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      const response = await authService.registerStep2(payload);

      if (response.data) {
        return { success: true, data: response.data };
      }
      throw new Error('Sign up failed');
    } catch (err: any) {
      console.log('Register Step 2 Error:', err.response);
      const errorMessage = err.message || 'Failed to sign up';
      const errorDetails = err.response?.data?.details || err.details;
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage, details: errorDetails };
    } finally {
      dispatch(setLoading(false));
    }
  };

  /**
   * Sign out current user
   */
  const signOut = async () => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      await authService.logout();
      dispatch(logoutAction());
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign out';
      dispatch(setError(errorMessage));
      // Still logout locally even if API call fails
      dispatch(logoutAction());
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    console.log('Auth State Changed:', { isAuthenticated, user, token });
    if (isAuthenticated && !user) {
      loadCurrentUser();
    }
  }, [isAuthenticated]);

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,
    
    // Methods
    signIn,
    registerStep1,
		registerStep2,
    signOut,
    loadCurrentUser,
    clearError: () => dispatch(clearError()),
  };
};
