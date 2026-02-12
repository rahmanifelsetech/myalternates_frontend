import { useAppDispatch, useAppSelector } from '@shared/hooks/useRedux';
import { setLoading, setUser, setDetails, setToken, setError, logout as logoutAction, clearError, UserDetails } from '@/modules/open/auth/store/authSlice';
import authService from '@/modules/open/auth/api/authService';
import userDetailsService from '@/modules/open/auth/api/userDetailsService';
import type { SignInFormData, SignUpStep1Data, SignUpStep2Data, ChangePasswordFormData } from '@/modules/open/auth/schema/auth.schemas';
import { IdentifierPayload, OtpPayload, SetNewPasswordFormData, SignInWithPasswordData, UserDetailsResponse } from '../types/auth';
import { useToast } from '@shared/hooks/useToast';
import type { User } from '@shared/types/user';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { success: toastSuccess, error: toastError } = useToast();
  const { user, details, token, loading, error } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!token;

  /**
   * Fetch user details based on personId and appType
   * Returns person details for admin users
   * Returns investorObj with person for investor users
   * Returns distributorObj with person for distributor users
   */
  const fetchUserDetails = async (userData: User): Promise<UserDetailsResponse | null> => {
    try {
      // The userData should have personId from the initial login response
      const personId = userData.personId;
      const appType = userData.appType;

      if (!personId || !appType) {
        console.warn('Missing personId or appType for fetching user details');
        return null;
      }

      const details = await userDetailsService.getUserDetails(personId, appType);
      dispatch(setDetails(details.data));
      return details;
    } catch (err: any) {
      console.error('Failed to fetch user details:', err);
      // Don't show error toast as this is not critical
      return null;
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
        toastSuccess('Signed in successfully!');
        return { success: true, data: userData };
      }
      throw new Error('Sign in failed');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign in';
      const errorDetails = err.response?.data?.details || err.details;
      dispatch(setError(errorMessage));
      toastError(errorMessage);
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


  /**
   * Change password
   */
  const changePassword = async (data: ChangePasswordFormData) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await authService.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      const { user: userData, access_token: authToken } = response.data;
      dispatch(setToken(authToken));
      dispatch(setUser(userData));
      toastSuccess('Password changed successfully!');
      return { success: true, message: "Password changed successfully" };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to change password';
      const errorDetails = err.response?.data?.details || err.details;
      toastError(errorMessage);
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage, details: errorDetails };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signInWithPassword = async (credentials: SignInWithPasswordData) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await authService.signInWithPassword(credentials);
      if (response.data) {
        const { user: userData, access_token: authToken } = response.data;
        dispatch(setToken(authToken));
        dispatch(setUser(userData));
        toastSuccess('Signed in successfully!');
        return { success: true, data: userData };
      }
      throw new Error('Sign in failed');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign in';
      const errorDetails = err.response?.data?.details || err.details;
      dispatch(setError(errorMessage));
      toastError(errorMessage);
      return { success: false, error: errorMessage, details: errorDetails };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signInWithOtp = async (credentials: OtpPayload) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await authService.signInWithOtp(credentials);
      if (response.data) {
        const { user: userData, access_token: authToken } = response.data;
        dispatch(setToken(authToken));
        dispatch(setUser(userData));
        toastSuccess('Signed in successfully!');
        return { success: true, data: userData };
      }
      throw new Error('Sign in failed');
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign in';
      const errorDetails = err.response?.data?.details || err.details;
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage, details: errorDetails };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const sendOtp = async (data: IdentifierPayload) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await authService.sendOtp(data);
      toastSuccess('OTP sent successfully!');
      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to send OTP';
      const errorDetails = err.response?.data?.details || err.details;
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage, details: errorDetails };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const verifyOtp = async (data: OtpPayload) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await authService.verifyOtp(data);
      toastSuccess('OTP verified successfully!');
      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to verify OTP';
      const errorDetails = err.response?.data?.details || err.details;
      toastError(errorMessage);
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage, details: errorDetails };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const resetPassword = async (data: SetNewPasswordFormData) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    try {
      const response = await authService.resetPassword(data);
      toastSuccess('Password has been reset successfully!');
      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to reset password';
      const errorDetails = err.response?.data?.details || err.details;
      toastError(errorMessage);
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage, details: errorDetails };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    // State
    user,
    details,
    token,
    isAuthenticated,
    loading,
    error,
    
    // Methods
    signIn,
    signInWithPassword,
    signInWithOtp,
    sendOtp,
    verifyOtp,
    resetPassword,
    registerStep1,
    registerStep2,
    signOut,
    changePassword,
    clearError: () => dispatch(clearError()),
    fetchUserDetails,
  };
};
