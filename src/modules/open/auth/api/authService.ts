import ApiService from '@shared/services/ApiService';
import type {
  AuthResponse,
  SignUpStep1Response,
  SignUpStep2Response,
  CurrentUserResponse,
  LogoutResponse,
  RefreshTokenResponse,
  ChangePasswordResponse,
  SignInPayload,
  SignUpStep1Payload,
  SignUpStep2Payload,
  ChangePasswordPayload,
  IdentifierPayload,
  OtpPayload,
  SetNewPasswordFormData,
  SignInWithPasswordData,
  VerifyOtpResponse,
} from '@/modules/open/auth/types/auth';

export const authService = {
  getCurrentUser: async (): Promise<CurrentUserResponse> => {
    return ApiService.get<CurrentUserResponse>('/auth/me');
  },

  signIn: async (credentials: SignInPayload): Promise<AuthResponse> => {
    return ApiService.post<AuthResponse>('/auth/signin', credentials);
  },

  signInWithPassword: async (credentials: SignInWithPasswordData): Promise<AuthResponse> => {
    return ApiService.post<AuthResponse>('/auth/signin/password', credentials);
  },

  signInWithOtp: async (credentials: OtpPayload): Promise<AuthResponse> => {
    return ApiService.post<AuthResponse>('/auth/signin/otp', credentials);
  },

  sendOtp: async (data: IdentifierPayload): Promise<any> => {
    return ApiService.post<any>('/auth/otp/send', data);
  },

  verifyOtp: async (data: OtpPayload): Promise<VerifyOtpResponse> => {
    return ApiService.post<any>('/auth/otp/verify', data);
  },

  resetPassword: async (data: SetNewPasswordFormData): Promise<any> => {
    return ApiService.post<any>('/auth/reset-password', data);
  },

  registerStep1: async (data: SignUpStep1Payload): Promise<SignUpStep1Response> => {
    return ApiService.post<SignUpStep1Response>('/auth/register/step1', data);
  },

  registerStep2: async (data: SignUpStep2Payload): Promise<SignUpStep2Response> => {
    return ApiService.post<SignUpStep2Response>('/auth/register/step2', data);
  },

  logout: async (): Promise<LogoutResponse> => {
    return ApiService.post<LogoutResponse>('/auth/logout');
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    return ApiService.post<RefreshTokenResponse>('/auth/refresh');
  },

  changePassword: async (data: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
    return ApiService.post<ChangePasswordResponse>('/auth/change-password', data);
  },
};

export default authService;
