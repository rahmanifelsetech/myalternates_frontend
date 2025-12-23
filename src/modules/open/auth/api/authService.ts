import ApiService from '@shared/services/ApiService';
import type {
  AuthResponse,
  SignUpStep1Response,
  SignUpStep2Response,
  CurrentUserResponse,
  LogoutResponse,
  RefreshTokenResponse,
  SignInPayload,
  SignUpStep1Payload,
  SignUpStep2Payload,
} from '@/modules/open/auth/types/auth';

export const authService = {
  getCurrentUser: async (): Promise<CurrentUserResponse> => {
    return ApiService.get<CurrentUserResponse>('/auth/me');
  },

  signIn: async (credentials: SignInPayload): Promise<AuthResponse> => {
    return ApiService.post<AuthResponse>('/auth/signin', credentials);
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
};

export default authService;
