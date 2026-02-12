import type { AdminProfile } from '../types/AdminProfile';
import Button from '@shared/components/ui/button/Button';
import { PencilIcon } from '@shared/icons';

interface Props {
  profile: AdminProfile;
  onEdit: () => void;
}

const AdminProfileCard = ({ profile, onEdit }: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
  <div className="flex justify-between items-start">
    
    {/* LEFT BLOCK */}
    <div className="flex gap-6 items-start">
      
      {/* AVATAR */}
      <div className="w-25 h-26 rounded-xl flex items-center justify-center self-center
                           bg-gradient-to-br from-[#d4af37] to-[#D9A514]
                           shadow-[0_4px_24px_4px_rgba(217,165,20,0.35)]">
             <span className="text-4xl font-bold leading-none text-black">
               {profile.name.charAt(0)}
             </span>
           </div>

      {/* TEXT SECTION */}
      <div>
        
        {/* NAME ROW */}
        <div className="flex items-center gap-3">
          <h2 className="text-[24px] font-semibold text-gray-900">
            {profile.name}
          </h2>

          <span className="rounded-full bg-success-100 px-3 py-1 text-[12px] font-medium text-success-700">
            Active
          </span>
        </div>

        {/* GRID STARTS LOWER */}
        <div className="mt-4 grid grid-cols-3 gap-x-12 gap-y-5 text-[16px]">

          <Info label="ID / Username" value={profile.usercode} />
          <Info label="Role" value={profile.role} highlight />
          <Info label="Email" value={profile.email} breakAll />
          <Info label="Mobile" value={profile.mobile} />
          <Info label="Last Login" value={profile.lastLogin} />

        </div>
      </div>
    </div>

    {/* BUTTON */}
    <div className="pt-1">
      <Button
        onClick={onEdit}
        variant="plain"
        startIcon={<PencilIcon className="size-4 text-white" />}
        className="bg-[#d4af37] hover:bg-[#B89220] text-[14px] text-white font-medium leading-normal"
      >
        Edit Profile
      </Button>
    </div>

  </div>
</div>
  );
};

const Info = ({
  label,
  value,
  highlight,
  breakAll,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
  breakAll?: boolean;
}) => (
  <div>
    <p className="text-gray-400 text-2xs py-1">
      {label}
    </p>
    <p
      className={`font-medium ${
        highlight ? 'text-warning-600' : 'text-gray-900'
      } ${breakAll ? 'break-all' : ''}`}
    >
      {value || '-'}
    </p>
  </div>
);

export default AdminProfileCard;

//    <div className="rounded-xl border bg-white px-6 py-7 shadow-sm border-gray-100">
//   <div className="flex justify-between items-start">
    
//     {/* LEFT SECTION */}
//     <div className="flex gap-5">
      
//       {/* AVATAR */}
//      <div className="w-25 h-26 rounded-xl flex items-center justify-center self-center
//                           bg-gradient-to-br from-[#d4af37] to-[#D9A514]
//                           shadow-[0_4px_24px_4px_rgba(217,165,20,0.35)]
// ">
//             <span className="text-4xl font-bold leading-none text-black">
//               {profile.name.charAt(0)}
//             </span>
//           </div>
//       {/* TEXT CONTENT */}
//       <div>
        
//         {/* NAME ROW */}
//         <div className="flex items-center gap-2">
//           <h2 className="text-3xl font-semibold text-gray-900">
//             {profile.name}
//           </h2>

//           <span className="rounded-full bg-success-100 px-3 py-1 text-[12px] font-medium text-success-700">
//             Active
//           </span>
//         </div>

//         {/* INFO GRID */}
//         <div className="mt-3 grid grid-cols-3 gap-x-10 gap-y-2 text-sm">
//           <Info label="Usercode" value={profile.usercode} />
//           <Info label="Role" value={profile.role} highlight />
//           <Info label="Email" value={profile.email} breakAll />
//           <Info label="Mobile" value={profile.mobile} />
//           <Info label="Last Login" value={profile.lastLogin} />
//         </div>
//       </div>
//     </div>

//     {/* BUTTON (TOP ALIGNED) */}
//     <div className="pt-1">
//       <Button
//         onClick={onEdit}
//         variant="plain"
//         startIcon={<PencilIcon className="size-4 text-white" />}
//         className=" bg-[#d4af37] hover:bg-[#B89220] text-[14px] text-white font-medium leading-normal"
//       >
//         Edit Profile
//       </Button>
//     </div>

//   </div>
// </div>

//   );
// };

/* ----------------------- */


// import type { AdminProfile } from '../types/AdminProfile';
// import Button from '@shared/components/ui/button/Button';
// import { PencilIcon } from '@shared/icons';

// interface Props {
//   profile: AdminProfile;
//   onEdit: () => void;
// }

// const AdminProfileCard = ({ profile, onEdit }: Props) => {
//   return (

//     <div className="rounded-xl border border-gray-200 bg-white px-8 py-4 shadow-sm">
      
//       <div className="flex justify-between items-center">
        
//         {/* LEFT CONTENT */}
//         <div className="flex gap-8">
          
//           {/* AVATAR */}
//             {/* AVATAR (GRADIENT + SHADOW LIKE IMAGE 2) */}
//           <div className="w-30 h-26 rounded-xl flex items-center justify-center self-center
//                           bg-gradient-to-br from-[#F5C542] to-[#D9A514]
//                           shadow-[0_4px_24px_4px_rgba(217,165,20,0.35)]
// ">
//             <span className="text-4xl font-bold leading-none text-black">
//               {profile.name.charAt(0)}
//             </span>
//           </div>


//           {/* DETAILS */}
//           <div>
            
//             {/* NAME + STATUS */}
//             <div className="flex items-center gap-3">
//               <h2 className="text-[24px] font-semibold text-gray-900">
//                 {profile.name}
//               </h2>

//               <span className="rounded-full bg-success-100 px-3 py-1 text-[12px] font-medium text-success-700">
//                 Active
//               </span>
//             </div>

//             {/* INFO GRID */}
//             <div className="mt-5 grid grid-cols-3 gap-x-16 gap-y-4 text-[16px]">
              
//               <Info label="ID / Username" value={profile.username} />
              
//               <Info 
//                 label="Role" 
//                 value={profile.role} 
//                 highlight 
//               />

//               <Info label="Email" value={profile.email} breakAll />
//               <Info label="Mobile" value={profile.mobile} />
//               <Info label="Last Login" value={profile.lastLogin} />

//             </div>
//           </div>
//         </div>

//         {/* EDIT BUTTON */}
  
//          <Button
//   onClick={onEdit}
//   variant="plain"
//   size="sm"
//   startIcon={<PencilIcon className="size-4 text-black" />}
//   className="!px-5 !py-2 bg-[#E6B325] hover:bg-[#dca81e] text-black rounded-md"
// >
//   Edit Profile
// </Button>


//       </div>
//     </div>
//   );
// };

// export default AdminProfileCard;

// /* ----------------------- */

// const Info = ({
//   label,
//   value,
//   highlight,
//   breakAll,
// }: {
//   label: string;
//   value?: string;
//   highlight?: boolean;
//   breakAll?: boolean;
// }) => (
//   <div>
//     <p className="text-[14px] text-gray-400 mb-1">
//       {label}
//     </p>
//     <p
//       className={`font-medium ${
//         highlight ? 'text-warning-600' : 'text-gray-900'
//       } ${breakAll ? 'break-all' : ''}`}
//     >
//       {value || '-'}
//     </p>
//   </div>
// );


// // import type { User } from '@shared/types/user';

// // interface Props {
// //   user: User;
// //   onEdit: () => void;
// // }

// // const AdminProfileCard = ({ user, onEdit }: Props) => {
// //   const fullName =
// //     user.firstName && user.lastName
// //       ? `${user.firstName} ${user.lastName}`
// //       : user.name;

// //   return (
// //     <div className="rounded-2xl bg-white px-10 py-8 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-gray-100">
// //       <div className="flex justify-between">
// //         <div className="flex gap-8">
// //           <div className="flex h-24 w-24 items-center justify-center rounded-2xl
// //             bg-gradient-to-br from-yellow-400 to-yellow-600
// //             text-3xl font-bold text-black
// //             shadow-[0_10px_30px_rgba(234,179,8,0.35)]">
// //             {fullName?.charAt(0)}
// //           </div>

// //           <div>
// //             <div className="flex items-center gap-4">
// //               <h2 className="text-2xl font-semibold text-gray-900">
// //                 {fullName}
// //               </h2>

// //               {user.isActive && (
// //                 <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
// //                   Active
// //                 </span>
// //               )}
// //             </div>

// //             <div className="mt-8 grid grid-cols-3 gap-x-28 gap-y-6 text-sm min-w-[600px]">
// //               <div>
// //                 <p className="text-xs text-gray-400">ID / Username</p>
// //                 <p className="font-medium text-gray-800 whitespace-nowrap">
// //                   {user.id}
// //                 </p>
// //               </div>

// //               <div>
// //                 <p className="text-xs text-gray-400">Role</p>
// //                 <p className="font-medium text-yellow-600">
// //                   {user.role}
// //                 </p>
// //               </div>

// //               <div>
// //                 <p className="text-xs text-gray-400">Email</p>
// //                 <p className="font-medium text-gray-800">
// //                   {user.email}
// //                 </p>
// //               </div>

// //               <div>
// //                 <p className="text-xs text-gray-400">Mobile</p>
// //                 <p className="font-medium text-gray-800">
// //                   {user.phone || ''}
// //                 </p>
// //               </div>

// //               <div>
// //                 <p className="text-xs text-gray-400">Last Login</p>
// //                 <p className="font-medium text-gray-800">
// //                   {user.lastLoginAt
// //                     ? new Date(user.lastLoginAt).toLocaleString()
// //                     : ''}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <button
// //           onClick={onEdit}
// //           className="rounded-xl bg-yellow-500 px-6 py-3 text-sm font-medium text-black shadow-sm hover:bg-yellow-600 transition"
// //         >
// //           ✏ Edit Profile
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminProfileCard;


// // import { User } from '@shared/types/user';

// // interface Props {
// //   profile: User;
// //   onEdit: () => void;
// // }

// // const AdminProfileCard = ({ profile, onEdit }: Props) => {
// //   return (
// //     <div className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
// //       <div className="flex items-center gap-5">
// //         {/* Avatar */}
// //         <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-xl font-bold text-white shadow">
// //           {profile.firstName?.charAt(0)}
// //         </div>

// //         <div>
// //           <div className="flex items-center gap-3">
// //             <h2 className="text-lg font-semibold text-gray-900">
// //               {profile.firstName && profile.lastName
// //   ? `${profile.firstName} ${profile.lastName}`
// //   : profile.name}

// //             </h2>

// //             <span
// //               className={`rounded-full px-3 py-1 text-xs font-medium ${
// //                 profile.isActive
// //                   ? 'bg-green-100 text-green-700'
// //                   : 'bg-red-100 text-red-600'
// //               }`}
// //             >
// //               {profile.isActive ? 'Active' : 'Inactive'}
// //             </span>
// //           </div>

// //           <div className="mt-3 grid grid-cols-3 gap-x-10 text-sm text-gray-500">
// //             <div>
// //               <p className="text-xs text-gray-400">ID / Username</p>
// //               <p className="text-gray-700 font-medium">{profile.id}</p>
// //             </div>

// //             <div>
// //               <p className="text-xs text-gray-400">Role</p>
// //               <p className="text-yellow-600 font-medium">
// //                 {profile.role}
// //               </p>
// //             </div>

// //             <div>
// //               <p className="text-xs text-gray-400">Email</p>
// //               <p className="text-gray-700 font-medium">
// //                 {profile.email}
// //               </p>
// //             </div>

// //             <div>
// //               <p className="text-xs text-gray-400">Mobile</p>
// //               <p className="text-gray-700 font-medium">
// //                 {profile.phone || '—'}
// //               </p>
// //             </div>

// //             <div>
// //               <p className="text-xs text-gray-400">Last Login</p>
// //               <p className="text-gray-700 font-medium">
// //                 {profile.lastLoginAt
// //                   ? new Date(profile.lastLoginAt).toLocaleString()
// //                   : '—'}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <button
// //         onClick={onEdit}
// //         className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-600 transition"
// //       >
// //         ✏ Edit Profile
// //       </button>
// //     </div>
// //   );
// // };

// // export default AdminProfileCard;
