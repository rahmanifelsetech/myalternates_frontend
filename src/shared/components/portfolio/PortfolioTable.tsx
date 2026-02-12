import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@shared/components/ui/table';
import { typographyClasses } from '@shared/utils/typographyUtils';
import ComponentCard from '../common/ComponentCard';
import NoDataRow from '../common/NoDataRow';

export interface ColumnConfig {
    key: string;
    header: string;
    render?: (value: any, row: any) => React.ReactNode;
}

export interface TableRowData {
    id: string;
    [key: string]: any;
}

export interface PortfolioTableProps {
    placeholder?: string;
    data: TableRowData[];
    columns: ColumnConfig[];
    onViewAll?: () => void;
    viewAllText?: string;
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({
    placeholder = 'Transactions',
    data,
    columns,
    onViewAll,
    viewAllText = 'View All',
}) => {
    const handleViewAll = () => {
        if (onViewAll) {
            onViewAll();
        }
    };

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto min-h-[300px]">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.key} isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                                        {column.header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {data.length ? data.map((row) => (
                                <TableRow key={row.id}>
                                    {columns.map((column) => (
                                        <TableCell key={`${row.id}-${column.key}`} className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.primary}`}>
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )) : (
                                <NoDataRow colSpan={columns.length} message={`No ${placeholder} found.`} />
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {onViewAll && (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        handleViewAll();
                    }}
                    className={`text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-400`}
                >
                    {viewAllText} →
                </a>
            )}
        </>

    );
};

export default PortfolioTable;
