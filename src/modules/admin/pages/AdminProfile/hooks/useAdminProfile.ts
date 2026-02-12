// modules/admin/pages/AdminProfile/hooks/useAdminProfile.ts

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export const useAdminProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);

  return {
    user,
    loading,
  };
};



// import { useSelector, useDispatch } from 'react-redux';
// import type { RootState, AppDispatch } from '@/app/store';
// import { setUser } from '@/modules/open/auth/store/authSlice';
// import { useUpdateAdminProfileMutation } from '../api/adminProfileApi';
// import { useState } from 'react';
// import { User } from '@shared/types/user';

// export const useAdminProfile = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const profile = useSelector(
//     (state: RootState) => state.auth.user
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [updateProfile, { isLoading }] =
//     useUpdateAdminProfileMutation();

//   const openEdit = () => setIsModalOpen(true);
//   const closeEdit = () => setIsModalOpen(false);

//   const handleSave = async (data: Partial<User>) => {
//     try {
//       const updatedUser = await updateProfile(data).unwrap();

//       // 🔥 update redux state
//       dispatch(setUser(updatedUser));

//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Update failed', error);
//     }
//   };

//   return {
//     profile,
//     isModalOpen,
//     openEdit,
//     closeEdit,
//     handleSave,
//     isUpdating: isLoading,
//   };
// };

// import { useSelector, useDispatch } from 'react-redux';
// import type { RootState, AppDispatch } from '@/app/store';
// import { setUser } from '@/modules/open/auth/store/authSlice';
// import { useUpdateAdminProfileMutation } from '../api/adminProfileApi';
// import { useState } from 'react';
// import { User } from '@shared/types/user';

// export const useAdminProfile = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const profile = useSelector(
//     (state: RootState) => state.auth.user
//   );

//   const [isEditOpen, setIsEditOpen] = useState(false);

//   const [updateProfile, { isLoading }] =
//     useUpdateAdminProfileMutation();

//   const handleUpdate = async (data: Partial<User>) => {
//     const updatedUser = await updateProfile(data).unwrap();

//     dispatch(setUser(updatedUser));

//     setIsEditOpen(false);
//   };

//   return {
//     profile,
//     isEditOpen,
//     openEdit: () => setIsEditOpen(true),
//     closeEdit: () => setIsEditOpen(false),
//     handleUpdate,
//     isUpdating: isLoading,
//   };
// };


