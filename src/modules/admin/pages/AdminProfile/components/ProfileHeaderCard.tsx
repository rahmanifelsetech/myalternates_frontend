// import Button from '@shared/components/ui/button/Button';
// import { PencilIcon } from '@shared/icons';
// import { User } from '@shared/types/user';

// interface Props {
//   user: User;
// }

// const ProfileHeaderCard = ({ user }: Props) => {
//   const fullName = user.name || 'User';
//   const initial = user.name?.charAt(0).toUpperCase() || 'U';

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-10 py-7 flex justify-between items-center">
      
//       {/* LEFT */}
//       <div className="flex items-center gap-10">

//         {/* Avatar */}
//         <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d9b24c] to-[#c49a2f] 
//                         flex items-center justify-center text-3xl font-semibold text-black 
//                         shadow-[0_6px_18px_rgba(196,154,47,0.35)]">
//           {initial}
//         </div>

//         {/* Info Section */}
//         <div>

//           {/* Name + Badge */}
//           <div className="flex items-center gap-4">
//             <h2 className="text-[24px] font-semibold text-gray-900 tracking-tight">
//               {fullName}
//             </h2>

//             {user.isActive && (
//               <span className="px-3 py-1 text-[12px] font-medium rounded-full bg-emerald-100 text-emerald-700">
//                 Active
//               </span>
//             )}
//           </div>

//           {/* Info Grid */}
//           <div className="mt-6 grid grid-cols-3 gap-x-20 gap-y-5">
            
//             <Info label="ID / Username" value={user.id} />
            
//             <Info 
//               label="Role" 
//               value={user.role} 
//               highlight 
//             />

//             <Info label="Email" value={user.email} />

//             <Info label="Mobile" value={user.phone || '-'} />

//             <Info
//               label="Last Login"
//               value={
//                 user.lastLoginAt
//                   ? new Date(user.lastLoginAt).toLocaleString()
//                   : '-'
//               }
//             />
//           </div>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="self-start">
//         <Button
//           variant="primary"
//           startIcon={<PencilIcon />}
//         >
//           Edit Profile
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProfileHeaderCard;

// /* -------------------------- */

// const Info = ({
//   label,
//   value,
//   highlight,
// }: {
//   label: string;
//   value: string;
//   highlight?: boolean;
// }) => (
//   <div>
//     <p className="text-[12px] text-gray-400 mb-1">
//       {label}
//     </p>
//     <p
//       className={`text-[14px] font-medium ${
//         highlight ? 'text-[#c49a2f]' : 'text-gray-900'
//       }`}
//     >
//       {value}
//     </p>
//   </div>
// );


// import Button from '@shared/components/ui/button/Button';
// import { PencilIcon } from '@shared/icons';
// import  typographyutils from '@shared/utils/typographyUtils';
// import { User } from '@shared/types/user';
// import { typographyClasses } from '@shared/utils/typographyUtils';
// interface Props {
//   user: User;
// }

// const ProfileHeaderCard = ({ user }: Props) => {
//   const fullName = user.name || 'User';
//   const initial = user.name?.charAt(0).toUpperCase() || 'U';

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 px-10 py-7 flex justify-between items-center shadow-sm">
      
//       <div className="flex items-center gap-8">
        
//         {/* Avatar */}
//         <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#d9b24c] to-[#c49a2f] flex items-center justify-center text-3xl font-semibold text-black shadow-md">
//           {initial}
//         </div>

//         {/* Info Section */}
//         <div>
          
//           {/* Name + Badge */}
//           <div className="flex items-center gap-4">
//             <h2 className={typographyClasses.special.pageTitle}>
//               {fullName}
//             </h2>

//             {user.isActive && (
//               <span className={`px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 ${typographyClasses.component.badge}`}>
//                 Active
//               </span>
//             )}
//           </div>

//           {/* Details */}
//           <div className="mt-6 grid grid-cols-3 gap-x-20 gap-y-4">
//             <Info label="ID / Username" value={user.id} />
//             <Info label="Role" value={user.role} highlight />
//             <Info label="Email" value={user.email} />
//             <Info label="Mobile" value={user.phone || '-'} />
//             <Info
//               label="Last Login"
//               value={
//                 user.lastLoginAt
//                   ? new Date(user.lastLoginAt).toLocaleString()
//                   : '-'
//               }
//             />
//           </div>
//         </div>
//       </div>

//       {/* Proper System Button */}
//       <Button
//         variant="primary"
//         startIcon={<PencilIcon />}
//         className={typographyClasses.component.button}
//       >
//         Edit Profile
//       </Button>
//     </div>
//   );
// };

// export default ProfileHeaderCard;

// const Info = ({
//   label,
//   value,
//   highlight,
// }: {
//   label: string;
//   value: string;
//   highlight?: boolean;
// }) => (
//   <div>
//     <p className={typographyClasses.body.xsmall + ' text-gray-400 mb-1'}>
//       {label}
//     </p>
//     <p
//       className={
//         highlight
//           ? `${typographyClasses.body.small} text-[#c49a2f]`
//           : typographyClasses.body.small
//       }
//     >
//       {value}
//     </p>
//   </div>
// );

// import { User } from '@shared/types/user';

// interface Props {
//   user: User;
// }

// const ProfileHeaderCard = ({ user }: Props) => {
//   const fullName = `${user.firstName} ${user.lastName}`;
//   const initial = user.firstName?.charAt(0).toUpperCase();

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-6 flex justify-between items-center shadow-sm">
//       <div className="flex items-center gap-6">
//         {/* Avatar Box */}
//         <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-2xl shadow-md">
//           {initial}
//         </div>

//         {/* Info */}
//         <div>
//           <div className="flex items-center gap-3">
//             <h2 className="text-xl font-semibold text-gray-900">
//               {fullName}
//             </h2>

//             {user.isActive && (
//               <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
//                 Active
//               </span>
//             )}
//           </div>

//           <div className="mt-3 grid grid-cols-3 gap-x-10 gap-y-3 text-sm">
//             <Info label="ID / Username" value={user.id} />
//             <Info label="Role" value={user.role} highlight />
//             <Info label="Email" value={user.email} />
//             <Info label="Mobile" value={user.phone || '-'} />
//             <Info
//               label="Last Login"
//               value={
//                 user.lastLoginAt
//                   ? new Date(user.lastLoginAt).toLocaleString()
//                   : '-'
//               }
//             />
//           </div>
//         </div>
//       </div>

//       {/* Edit Button */}
//       <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg transition">
//         ✏ Edit Profile
//       </button>
//     </div>
//   );
// };

// export default ProfileHeaderCard;

// const Info = ({
//   label,
//   value,
//   highlight,
// }: {
//   label: string;
//   value: string;
//   highlight?: boolean;
// }) => (
//   <div>
//     <p className="text-gray-400 text-xs">{label}</p>
//     <p className={`font-medium ${highlight ? 'text-yellow-600' : 'text-gray-900'}`}>
//       {value}
//     </p>
//   </div>
// );
