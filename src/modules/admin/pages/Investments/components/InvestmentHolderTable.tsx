import React from 'react';
import { Holder } from '../../Investors/types/holder';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@shared/components/ui/table';
import Button from '@shared/components/ui/button/Button';
import typographyClasses from '@/shared/utils/typographyUtils';
import NoDataRow from '@/shared/components/common/NoDataRow';
import { IconButton } from '@/shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@/shared/icons';

interface InvestmentHolderTableProps {
    holders: Holder[];
    onEdit: (holder: Holder) => void;
    onDelete: (holder: Holder) => void;
    disableEditDeleteFirst?: boolean;
}

const InvestmentHolderTable: React.FC<InvestmentHolderTableProps> = ({ holders, onEdit, onDelete, disableEditDeleteFirst }) => {
    if (!holders?.length) return <div className="text-gray-500">No holders added.</div>;
    return (
        <div className="max-w-full overflow-x-auto">
            <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                        <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                            Name
                        </TableCell>
                        <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                            PAN
                        </TableCell>
                        <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                            Mobile
                        </TableCell>
                        <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                            Email
                        </TableCell>
                        <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {holders.length === 0 ? (
                        <NoDataRow colSpan={5} message="No holders found." />
                    ) : (
                        holders.map((holder, idx) => (
                            <TableRow key={holder.id}>
                                <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                    {holder.name}
                                </TableCell>
                                <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                    {holder.pan}
                                </TableCell>
                                <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                    {holder.mobile}
                                </TableCell>
                                <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                    {holder.email}
                                </TableCell>

                                <TableCell className={`px-4 py-3 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                    <div className="flex items-center space-x-3.5">
                                        <IconButton
                                            onClick={() => onEdit(holder)}
                                            className="hover:text-primary"
                                            icon={<PencilIcon className="size-5" />}
                                        />
                                        <IconButton
                                            onClick={() => onDelete(holder) }
                                            className="hover:text-error-500"
                                            icon={<TrashBinIcon className="size-5" />}
                                            disabled={disableEditDeleteFirst && idx === 0}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}

                </TableBody>
            </Table>
        </div>

        // <Table>
        //   <TableHeader>
        //     <TableRow>
        //       <TableCell>Name</TableCell>
        //       <TableCell>PAN</TableCell>
        //       <TableCell>Mobile</TableCell>
        //       <TableCell>Email</TableCell>
        //       <TableCell>Actions</TableCell>
        //     </TableRow>
        //   </TableHeader>
        //   <TableBody>
        //     {holders.map((holder) => (
        //       <TableRow key={holder.id}>
        //         <TableCell>{holder.name}</TableCell>
        //         <TableCell>{holder.pan}</TableCell>
        //         <TableCell>{holder.mobile}</TableCell>
        //         <TableCell>{holder.email}</TableCell>
        //         <TableCell>
        //           <Button size="sm" onClick={() => onEdit(holder)}>Edit</Button>
        //           <Button size="sm" variant="outline" onClick={() => onDelete(holder)}>Delete</Button>
        //         </TableCell>
        //       </TableRow>
        //     ))}
        //   </TableBody>
        // </Table>
    );
};

export default InvestmentHolderTable;
