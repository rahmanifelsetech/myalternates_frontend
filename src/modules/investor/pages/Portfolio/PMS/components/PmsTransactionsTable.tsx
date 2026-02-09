import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@shared/components/ui/table';
import Badge from '@shared/components/ui/badge/Badge';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { pmsTransactions, formatCurrency, formatPercent } from '../constants/pmsDummyData';

export const PmsTransactionsTable: React.FC = () => {
  const getTypeColor = (type: string): 'success' | 'warning' | 'error' | 'info' | 'primary' => {
    switch (type) {
      case 'BUY':
        return 'success';
      case 'SELL':
        return 'error';
      case 'DIVIDEND':
        return 'info';
      case 'DEPOSIT':
        return 'primary';
      case 'WITHDRAWAL':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <h3 className={`mb-6 ${typographyClasses.heading.h3} ${typographyClasses.colors.text.primary}`}>
        PMS Transactions
      </h3>
      
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto min-h-[300px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Date
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Type
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Instrument
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Quantity
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Price
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {pmsTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {transaction.date}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Badge
                      color={getTypeColor(transaction.type)}
                      variant="light"
                      size="sm"
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    {transaction.instrumentName || '-'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {transaction.quantity > 0 ? transaction.quantity.toLocaleString('en-IN') : '-'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.primary}`}>
                    {transaction.price > 0 ? formatCurrency(transaction.price) : '-'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PmsTransactionsTable;
