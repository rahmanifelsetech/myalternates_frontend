// modules/admin/pages/AdminProfile/api/adminProfileApi.ts

import  api  from '@shared/services/rtkService';  
import { User } from '@shared/types/user';

export const adminProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateAdminProfile: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: '/admin/profile',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useUpdateAdminProfileMutation } = adminProfileApi;



// import  api from '@shared/services/rtkService';
// import { User } from '@shared/types/user';

// export const adminProfileApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     updateAdminProfile: builder.mutation<User, Partial<User>>({
//       query: (data) => ({
//         url: '/admin/profile',
//         method: 'PUT',
//         data,
//       }),
//     }),
//   }),
// });

// export const { useUpdateAdminProfileMutation } =
//   adminProfileApi;

// import  api from '@shared/services/rtkService';
// import { User } from '@shared/types/user';


// export const adminProfileApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     updateAdminProfile: builder.mutation<User, Partial<User>>({
//       query: (data) => ({
//         url: '/admin/profile',
//         method: 'PUT',
//         data,
//       }),
//     }),
//   }),
// });

// export const { useUpdateAdminProfileMutation } =
//   adminProfileApi;
