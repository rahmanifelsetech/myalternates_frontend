import RtkQueryService from '@shared/services/rtkService';
import { PermissionFilters, CreatePermissionPayload, UpdatePermissionPayload, CreatePermissionResponse, UpdatePermissionResponse, DeletePermissionResponse, GetPermissionsResponse } from '../types/permission';

export const permissionApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['Permissions'],
}).injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query<GetPermissionsResponse, PermissionFilters>({
      query: (params) => ({
        url: '/permissions',
        method: 'GET',
        params,
      }),
      providesTags: ['Permissions'],
    }),
    createPermission: builder.mutation<CreatePermissionResponse, CreatePermissionPayload>({
      query: (data) => ({
        url: '/permissions',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Permissions'],
    }),
    updatePermission: builder.mutation<UpdatePermissionResponse, UpdatePermissionPayload>({
      query: ({ id, ...data }) => ({
        url: `/permissions/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Permissions'],
    }),
    deletePermission: builder.mutation<DeletePermissionResponse, string>({
      query: (id) => ({
        url: `/permissions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Permissions'],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionApi;
