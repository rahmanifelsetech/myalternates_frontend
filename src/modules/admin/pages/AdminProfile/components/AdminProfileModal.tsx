// import { useEffect, useState } from 'react';
// import type { User } from '@shared/types/user';

// interface Props {
//   isOpen: boolean;
//   user: User;
//   onClose: () => void;
//   onSave: (data: Partial<User>) => void;
//   isLoading: boolean;
// }

// const AdminProfileModal = ({
//   isOpen,
//   user,
//   onClose,
//   onSave,
//   isLoading,
// }: Props) => {
//   const [form, setForm] = useState<User>(user);

//   useEffect(() => {
//     if (isOpen) {
//       setForm(user);
//     }
//   }, [isOpen, user]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <div className="w-[700px] rounded-2xl bg-white shadow-xl border border-gray-100 p-6">
//         <div className="grid grid-cols-2 gap-6">
//           <input
//             value={form.firstName}
//             onChange={(e) =>
//               setForm({ ...form, firstName: e.target.value })
//             }
//             className="rounded-lg border px-3 py-2"
//           />

//           <input
//             value={form.lastName}
//             onChange={(e) =>
//               setForm({ ...form, lastName: e.target.value })
//             }
//             className="rounded-lg border px-3 py-2"
//           />

//           <input
//             value={form.email}
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//             className="rounded-lg border px-3 py-2 col-span-2"
//           />

//           <input
//             value={form.phone}
//             onChange={(e) =>
//               setForm({ ...form, phone: e.target.value })
//             }
//             className="rounded-lg border px-3 py-2 col-span-2"
//           />
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button onClick={onClose}>Cancel</button>

//           <button
//             onClick={() => onSave(form)}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfileModal;


// import { useState, useEffect } from 'react';
// import { User } from '@shared/types/user';

// interface Props {
//   isOpen: boolean;
//   profile: User;
//   onClose: () => void;
//   onSubmit: (data: Partial<User>) => void;
//   isLoading: boolean;
// }

// const InputField = ({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value?: string;
//   onChange: (val: string) => void;
// }) => (
//   <div>
//     <label className="mb-1 block text-xs font-medium text-gray-500">
//       {label}
//     </label>
//     <input
//       value={value ?? ''}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//     />
//   </div>
// );

// const AdminProfileModal = ({
//   isOpen,
//   profile,
//   onClose,
//   onSubmit,
//   isLoading,
// }: Props) => {
//   const [form, setForm] = useState(profile);

//   useEffect(() => {
//     setForm(profile);
//   }, [profile]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//       <div className="w-[650px] rounded-2xl bg-white shadow-xl border border-gray-100">
//         {/* HEADER */}
//         <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
//           <h3 className="text-base font-semibold text-gray-900">
//             Edit Profile
//           </h3>

//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-lg"
//           >
//             ×
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="px-6 py-6">
//           <div className="grid grid-cols-2 gap-6">
//             <InputField
//               label="First Name"
//               value={form.firstName}
//               onChange={(val) =>
//                 setForm({ ...form, firstName: val })
//               }
//             />

//             <InputField
//               label="Last Name"
//               value={form.lastName}
//               onChange={(val) =>
//                 setForm({ ...form, lastName: val })
//               }
//             />

//             <InputField
//               label="Email Address"
//               value={form.email}
//               onChange={(val) =>
//                 setForm({ ...form, email: val })
//               }
//             />

//             <InputField
//               label="Phone Number"
//               value={form.phone}
//               onChange={(val) =>
//                 setForm({ ...form, phone: val })
//               }
//             />
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
//           <button
//             onClick={onClose}
//             className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={() => onSubmit(form)}
//             disabled={isLoading}
//             className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-600 transition disabled:opacity-50"
//           >
//             {isLoading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfileModal;
