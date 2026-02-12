import ApiService from '@shared/services/ApiService';
import type { UserDetails } from '../store/authSlice';
import { UserDetailsResponse } from '../types/auth';

/**
 * User details service - fetches user details based on personId and appType
 */
export const userDetailsService = {
  /**
   * Fetch user details based on personId and appType
   * Calls /auth/me endpoint with query params
   *param person 
   * @Id - The person's ID
   * @param appType - The user's app type (ADMIN | INVESTOR | DISTRIBUTOR)
   * @returns UserDetails with person, and optionally investorObj or distributorObj
   */
  getUserDetails: async (personId: string, appType: 'ADMIN' | 'INVESTOR' | 'DISTRIBUTOR'): Promise<UserDetailsResponse> => {
    return ApiService.get<UserDetailsResponse>('/auth/me', {
      params: {
        personId,
        appType,
      },
    });
  },
};

export default userDetailsService;
