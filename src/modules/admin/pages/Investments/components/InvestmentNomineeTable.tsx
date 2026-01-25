import React from 'react';
import { Nominee } from '../../Investors/types/nominee';
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

interface InvestmentNomineeTableProps {
  nominees: Nominee[];
  onEdit: (nominee: Nominee) => void;
  onDelete: (nominee: Nominee) => void;
}

const InvestmentNomineeTable: React.FC<InvestmentNomineeTableProps> = ({ nominees, onEdit, onDelete }) => {
  if (!nominees?.length) return <div className="text-gray-500">No nominees added.</div>;
  return (
    <div className="max-w-full overflow-x-auto">
        <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                        Name
                    </TableCell>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                        ID Type
                    </TableCell>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                        ID Number
                    </TableCell>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                        Relationship
                    </TableCell>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                        Actions
                    </TableCell>
                </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {nominees.length === 0 ? (
                    <NoDataRow colSpan={5} message="No nominees found." />
                ) : (
                    nominees.map((nominee) => (
                        <TableRow key={nominee.id}>
                            <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                {nominee.name}
                            </TableCell>
                            <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                {nominee.idType}
                            </TableCell>
                            <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                {nominee.idNumber}
                            </TableCell>
                            <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                {nominee.relationship}
                            </TableCell>

                            <TableCell className={`px-4 py-3 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                                <div className="flex items-center space-x-3.5">
                                    <IconButton
                                        onClick={() => onEdit(nominee)}
                                        className="hover:text-primary"
                                        icon={<PencilIcon className="size-5" />}
                                    />
                                    <IconButton
                                        onClick={() => onDelete(nominee) }
                                        className="hover:text-error-500"
                                        icon={<TrashBinIcon className="size-5" />}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}

            </TableBody>
        </Table>
    </div>
  );
};

export default InvestmentNomineeTable;
