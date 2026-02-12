import type { User } from '@shared/types/user';
import type { SingleResponse, EmptyResponse } from '@shared/types/api';

/**
 * Auth Response Types
 * Domain-specific responses extending base API response types
 */


/**
 * Response from /auth/me endpoint
 * For ADMIN: Returns person details
 * For INVESTOR: Returns investorObj with person
 * For DISTRIBUTOR: Returns distributorObj with person
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
  // Investor specific (present when appType=INVESTOR)
  investor?: {
    id: string;
    myaltCode: string;
    primaryPersonId: string;
    primaryPan?: string;
    residentialStatus?: string;
    subStatus?: string;
    inceptionDate?: string;
    isActive: boolean;
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


export type UserDetailsResponse = SingleResponse<UserDetails>;


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
  rememberMe?: boolean;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface IdentifierPayload {
  identifier: string;
  rememberMe?: boolean;
}

export interface OtpPayload {
  otp: string;
  identifier: string;
  rememberMe?: boolean;
}

export interface SetNewPasswordFormData {
  reset_token: string;
  password: string;
  confirmPassword: string;
}
