import React from 'react';
import { Distributor } from '../types/distributor';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import { useGetUsersQuery } from '../../Users/api/userApi';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CanAccess } from '@shared/components/common/CanAccess';
import { PERMISSIONS } from '@shared/constants/permissions';
import NoDataRow from '@/shared/components/common/NoDataRow';
import { User } from '@/shared/types/user';

interface DistributorsTableProps {
    distributors: Distributor[];
    isLoading: boolean;
    onEdit: (distributor: Distributor) => void;
    onDelete: (id: string) => void;
}

export const DistributorsTable: React.FC<DistributorsTableProps> = ({ distributors, isLoading, onEdit, onDelete }) => {
    // const { data: userList } = useGetUsersQuery({ limit: 1000 });
    
    const getRmName = (rm: Partial<User> | undefined) => {
        return rm ? `${rm.firstName} ${rm.lastName}` : 'N/A';
    };

    if (isLoading) {
        return <div className="p-4 text-center">Loading distributors...</div>;
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Code</TableCell>
                            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Name</TableCell>
                            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Type</TableCell>
                            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Category</TableCell>
                            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>RM</TableCell>
                            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Status</TableCell>
                            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Actions</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {distributors.length === 0 ? (
                            <NoDataRow colSpan={7} message="No Distributors found." />
                        ) : (
                            distributors.map((distributor) => (
                                <TableRow key={distributor.id}>
                                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                        {distributor.code}
                                    </TableCell>
                                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                        <span className={`${typographyClasses.component.button} ${typographyClasses.colors.text.primary}`}>
                                            {distributor.person.fullName}
                                        </span>
                                    </TableCell>
                                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                        {distributor.type}
                                    </TableCell>
                                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                        {distributor.category}
                                    </TableCell>
                                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                        {getRmName(distributor.relationshipManager)}
                                    </TableCell>
                                    <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                        <span className={`inline-block px-2 py-1 rounded ${typographyClasses.body.caption} ${
                                            distributor.isActive
                                                ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100'
                                                : 'bg-error-100 text-error-800 dark:bg-error-700 dark:text-error-100'
                                        }`}>
                                            {distributor.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </TableCell>
                                    <TableCell className={`px-4 py-3 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                        <div className="flex items-center space-x-3.5">
                                            <CanAccess any={[PERMISSIONS.DISTRIBUTORS.UPDATE]}>
                                                <IconButton
                                                    onClick={() => onEdit(distributor)}
                                                    className="hover:text-primary"
                                                    icon={<PencilIcon className="size-5" />}
                                                />
                                            </CanAccess>
                                            <CanAccess any={[PERMISSIONS.DISTRIBUTORS.DELETE]}>
                                                <IconButton
                                                    onClick={() => onDelete(distributor.id)}
                                                    className="hover:text-error-500"
                                                    icon={<TrashBinIcon className="size-5" />}
                                                />
                                            </CanAccess>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
