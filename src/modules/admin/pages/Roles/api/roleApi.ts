import RtkQueryService from '@shared/services/rtkService';
import { RoleFilters, CreateRolePayload, UpdateRolePayload, CreateRoleResponse, UpdateRoleResponse, DeleteRoleResponse, GetRolesResponse } from '../types/role';

export const roleApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['Roles'],
}).injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<GetRolesResponse, RoleFilters>({
      query: (params) => ({
        url: '/roles',
        method: 'GET',
        params,
      }),
      providesTags: ['Roles'],
    }),
    createRole: builder.mutation<CreateRoleResponse, CreateRolePayload>({
      query: (data) => ({
        url: '/roles',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Roles'],
    }),
    updateRole: builder.mutation<UpdateRoleResponse, UpdateRolePayload>({
      query: ({ id, ...data }) => ({
        url: `/roles/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Roles'],
    }),
    deleteRole: builder.mutation<DeleteRoleResponse, string>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Roles'],
    }),
    assignPermissions: builder.mutation<
      UpdateRoleResponse,
      { id: string; permissionIds: string[] }
    >({
      query: ({ id, permissionIds }) => ({
        url: `/roles/${id}/assign-permissions`,
        method: 'POST',
        data: { permissionIds },
      }),
      invalidatesTags: ['Roles'],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAssignPermissionsMutation,
} = roleApi;
