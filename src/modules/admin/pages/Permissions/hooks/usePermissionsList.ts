import { useGetPermissionsQuery } from '../api/permissionApi';
import { Permission } from '../types/permission';

/**
 * Custom hook for fetching and managing permissions list
 * Optimized for reuse across multiple pages (Permissions, Roles, etc.)
 * 
 * Features:
 * - Automatic caching via RTK Query
 * - Loading state management
 * - Error handling
 * - Always fetches full list (no pagination for permission selectors)
 */
export const usePermissionsList = () => {
  // Fetch all permissions without pagination
  const { data, isLoading, error, isFetching } = useGetPermissionsQuery({ 
    search:'', limit: 1000, page: 1
  });

  const permissions: Permission[] = data?.data || [];

  return {
    permissions,
    isLoading,
    isFetching,
    error,
    isReady: !isLoading && permissions.length > 0,
  };
};
