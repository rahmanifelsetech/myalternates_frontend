import { useMemo } from 'react';
import { useGetRolesQuery } from '../api/roleApi';
import { Role } from '../types/role';

interface UseRolesListReturn {
  roles: Role[];
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  isReady: boolean;
}

/**
 * Hook to fetch roles list with RTK Query caching
 * Used across the admin panel for role selection dropdowns
 * 
 * Usage:
 * const { roles, isLoading, error } = useRolesList();
 * const roleOptions = roles.map(r => ({ value: r.id, label: r.name }));
 */
export const useRolesList = (): UseRolesListReturn => {
  const { data, isLoading, isFetching, error } = useGetRolesQuery({ limit: 1000 });

  const roles = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  return {
    roles,
    isLoading,
    isFetching,
    error,
    isReady: !isLoading && !isFetching,
  };
};
