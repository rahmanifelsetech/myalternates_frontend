import AdminProfileCard from './components/AdminProfileCard';
import PersonalInformation from './components/PersonalInformation';
import { useAdminProfile } from './hooks/useAdminProfile';

const AdminProfile = () => {
  const { user } = useAdminProfile();

  if (!user) return null;

  const profile = {
    name: user.name,
    username: user.id,
    role: user.role,
    email: user.email,
    mobile: user.phone || '-',
    lastLogin: user.lastLoginAt
      ? new Date(user.lastLoginAt).toLocaleString()
      : '-',
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-10 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Admin Profile
        </h1>
        <p className="text-1sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        <AdminProfileCard profile={profile} onEdit={() => {}} />
        <PersonalInformation user={user} />
      </div>
    </div>
  );
};

export default AdminProfile;

// import AdminProfileCard from './components/AdminProfileCard';
// import PersonalInformation from './components/PersonalInformation';
// import { useAdminProfile } from './hooks/useAdminProfile';

// const AdminProfile = () => {
//   const { user } = useAdminProfile();

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-[#f8fafc] px-10 py-8">
//       {/* Page Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           Admin Profile
//         </h1>
//         <p className="text-sm text-gray-500">
//           Manage your account settings and preferences
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="space-y-6">
//         <AdminProfileCard profile={user} onEdit={() => {}} />
//         <PersonalInformation user={user} />
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;




// import { useAdminProfile } from './hooks/useAdminProfile';
// import AdminProfileCard from './components/AdminProfileCard';
// import PersonalInformation from './components/PersonalInformation';

// const AdminProfile = () => {
//   const { profile, openEdit } = useAdminProfile();

//   if (!profile) return null;

//   return (
//     <div className="px-8 py-6">
//       {/* PAGE HEADER */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">
//           Admin Profile
//         </h1>
//         <p className="mt-1 text-sm text-gray-500">
//           Manage your account settings and preferences
//         </p>
//       </div>

//       <div className="space-y-6">
//         <AdminProfileCard profile={profile} onEdit={openEdit} />
//         <PersonalInformation profile={profile} />
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

