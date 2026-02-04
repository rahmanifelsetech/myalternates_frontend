// import React from 'react';
// import Badge from '@shared/components/ui/badge/Badge';
// import { typographyClasses } from '@shared/utils/typographyUtils';
// import { Investor } from '../types/investor';
// import NoDataRow from '@shared/components/common/NoDataRow';

// interface RelatedEntitiesProps {
//   investor: Investor;
// }

// export const RelatedEntities: React.FC<RelatedEntitiesProps> = ({ investor }) => {
//   return (
//     <div className="space-y-6">
//       {/* Banks Section */}
//       <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
//         <div className="border-b border-gray-100 px-4 py-5 dark:border-gray-800 sm:px-6">
//           <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary}`}>
//             Banks ({investor.banks?.length || 0})
//           </h3>
//         </div>
//         <div className="px-4 py-5 sm:px-6">
//           {investor.banks && investor.banks?.length > 0 ? (
//             <div className="space-y-3">
//               {investor.banks.map((bank, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-start justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
//                 >
//                   <div className="flex-1">
//                     <p className={`${typographyClasses.body.small} font-medium ${typographyClasses.colors.text.primary}`}>
//                       {(bank as any).bankName || 'Bank'}
//                     </p>
//                     <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mt-1`}>
//                       Account: {(bank as any).accountNumber || '-'}
//                     </p>
//                   </div>
//                   <Badge color="primary" variant="light" size="sm">
//                     {(bank as any).accountType || 'Standard'}
//                   </Badge>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <NoDataRow colSpan={investor.banks?.length} />
//           )}
//         </div>
//       </div>

//       {/* Holders Section */}
//       <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
//         <div className="border-b border-gray-100 px-4 py-5 dark:border-gray-800 sm:px-6">
//           <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary}`}>
//             Holders ({investor.holders?.length || 0})
//           </h3>
//         </div>
//         <div className="px-4 py-5 sm:px-6">
//           {investor.holders && investor.holders?.length > 0 ? (
//             <div className="space-y-3">
//               {investor.holders.map((holder, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-start justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
//                 >
//                   <div className="flex-1">
//                     <p className={`${typographyClasses.body.small} font-medium ${typographyClasses.colors.text.primary}`}>
//                       {(holder as any).person?.fullName || 'Holder'}
//                     </p>
//                     <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mt-1`}>
//                       Pan: {(holder as any).person?.pan || '-'}
//                     </p>
//                   </div>
//                   <Badge color="info" variant="light" size="sm">
//                     Order {(holder as any).holderOrder || idx + 1}
//                   </Badge>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <NoDataRow colSpan={investor.holders?.length} />
//           )}
//         </div>
//       </div>

//       {/* Nominees Section */}
//       <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
//         <div className="border-b border-gray-100 px-4 py-5 dark:border-gray-800 sm:px-6">
//           <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary}`}>
//             Nominees ({investor.nominees?.length || 0})
//           </h3>
//         </div>
//         <div className="px-4 py-5 sm:px-6">
//           {investor.nominees && investor.nominees?.length > 0 ? (
//             <div className="space-y-3">
//               {investor.nominees.map((nominee, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-start justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
//                 >
//                   <div className="flex-1">
//                     <p className={`${typographyClasses.body.small} font-medium ${typographyClasses.colors.text.primary}`}>
//                       {(nominee as any).person?.fullName || 'Nominee'}
//                     </p>
//                     <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mt-1`}>
//                       Relationship: {(nominee as any).relationship || '-'}
//                     </p>
//                   </div>
//                   <Badge color="warning" variant="light" size="sm">
//                     {(nominee as any).nomineeOrder || idx + 1}
//                   </Badge>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <NoDataRow colSpan={investor.nominees?.length}/>
//           )}
//         </div>
//       </div>

//       {/* Documents Section */}
//       <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
//         <div className="border-b border-gray-100 px-4 py-5 dark:border-gray-800 sm:px-6">
//           <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary}`}>
//             Documents ({investor.documents?.length || 0})
//           </h3>
//         </div>
//         <div className="px-4 py-5 sm:px-6">
//           {investor.documents && investor.documents?.length > 0 ? (
//             <div className="space-y-3">
//               {investor.documents.map((doc, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-start justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50"
//                 >
//                   <div className="flex-1">
//                     <p className={`${typographyClasses.body.small} font-medium ${typographyClasses.colors.text.primary}`}>
//                       {(doc as any).documentType || 'Document'}
//                     </p>
//                     <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mt-1`}>
//                       {(doc as any).fileName || (doc as any).documentUrl || 'No file'}
//                     </p>
//                   </div>
//                   {(doc as any).verificationStatus && (
//                     <Badge
//                       color={
//                         (doc as any).verificationStatus === 'approved'
//                           ? 'success'
//                           : (doc as any).verificationStatus === 'rejected'
//                             ? 'error'
//                             : 'warning'
//                       }
//                       variant="light"
//                       size="sm"
//                     >
//                       {(doc as any).verificationStatus}
//                     </Badge>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <NoDataRow colSpan={investor.documents?.length} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RelatedEntities;
