import type { User } from '@shared/types/user';
import type { SingleResponse, EmptyResponse } from '@shared/types/api';

/**
 * Auth Response Types
 * Domain-specific responses extending base API response types
 */

export type AuthResponse = SingleResponse<{
  user: User;
  access_token: string;
}>;

export type VerifyOtpResponse = SingleResponse<{
  reset_token: string;
}>;

export type SignUpStep1Response = SingleResponse<{
  userId: string;
}>;

export type SignUpStep2Response = EmptyResponse;

export type CurrentUserResponse = SingleResponse<User>;

export type LogoutResponse = EmptyResponse;

export type RefreshTokenResponse = SingleResponse<{
  token: string;
}>;

export type ChangePasswordResponse = SingleResponse<{
  user: User;
  access_token: string;
}>;

/**
 * Auth Request Payloads
 */
export interface SignInPayload {
  username: string;
  email: string;
  password: string;
}

export interface SignUpStep1Payload {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  countryCode: string;
  phone: string;
}

export interface SignUpStep2Payload {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface SignInWithPasswordData {
  identifier: string;
  password: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface IdentifierPayload {
  identifier: string;
}

export interface OtpPayload {
  otp: string;
  identifier: string;
}

export interface SetNewPasswordFormData {
  reset_token: string;
  password: string;
  confirmPassword: string;
}
