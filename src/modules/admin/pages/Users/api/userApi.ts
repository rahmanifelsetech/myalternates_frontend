import RtkQueryService from '@shared/services/rtkService';
import { UserFilters, CreateUserPayload, UpdateUserPayload, CreateUserResponse, UpdateUserResponse, DeleteUserResponse, GetUsersResponse } from '../types/user';

export const userApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['Users'],
}).injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, UserFilters>({
      query: (params) => ({
        url: '/users',
        method: 'GET',
        params,
      }),
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserPayload>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserPayload>({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
