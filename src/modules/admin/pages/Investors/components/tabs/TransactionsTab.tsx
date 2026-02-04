import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { typographyClasses } from '@shared/utils/typographyUtils';
import NoDataRow from '@shared/components/common/NoDataRow';
import { formatDate } from '@shared/utils/dateUtils';
import Badge from '@shared/components/ui/badge/Badge';

interface Transaction {
  id: string;
  investmentId: string;
  productName?: string;
  amcName?: string;
  schemeName?: string;
  investment: {
    scheme: {
      schemeName: string;
    };
    product: {
      name: string;
    };
    amc: {
      name: string;
    };
  }
  orderDate: string;
  valuationDate: string | null;
  transactionType: 'Withdrawn' | 'Addition';
  amount: string;
  capitalCommitment: string | null;
  capitalCalled: string | null;
  pendingCapital: string | null;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TransactionsTabProps {
  investorId: string;
  accountId?: string;
  transactions?: Transaction[];
  isLoading?: boolean;
}


export const TransactionsTab: React.FC<TransactionsTabProps> = ({
  investorId,
  accountId,
  transactions = [],
  isLoading = false,
}) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading transactions...</div>;
  }

  if (!transactions || transactions.length === 0) {
    return <NoDataRow colSpan={7} message="No transactions found for this account." />;
  }

  const totalAmount = transactions.reduce((sum, t) => sum + (parseFloat(t.amount || '0') || 0), 0);
  const additionTransactions = transactions.filter(t => t.transactionType === 'Addition').length;
  const withdrawalTransactions = transactions.filter(t => t.transactionType === 'Withdrawn').length;

  const getTypeColor = (type: string): 'success' | 'warning' | 'error' | 'info' | 'primary' => {
    switch (type) {
      case 'Addition':
        return 'success';
      case 'Withdrawn':
        return 'error';
      default:
        return 'primary';
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <SummaryCard label="Total Transactions" value={transactions.length.toString()} />
        <SummaryCard label="Additions" value={additionTransactions.toString()} />
        <SummaryCard label="Withdrawals" value={withdrawalTransactions.toString()} />
        <SummaryCard label="Total Amount" value={`₹${totalAmount?.toLocaleString('en-IN', { maximumFractionDigits: 2 }) || 0}`} />
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Product
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  AMC
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Scheme
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Transaction Date
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Transaction Type
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    {transaction.investment?.product?.name || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {transaction.investment?.amc?.name || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {transaction?.investment?.scheme?.schemeName || '-'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {formatDate(transaction.orderDate)}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start`}>
                    <Badge
                      color={getTypeColor(transaction.transactionType)}
                      variant="light"
                      size="sm"
                    >
                      {transaction.transactionType}
                    </Badge>
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    ₹{parseFloat(transaction.amount || '0').toLocaleString('en-IN', { maximumFractionDigits: 2 })}
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

interface SummaryCardProps {
  label: string;
  value: string | number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
    <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mb-2`}>
      {label}
    </p>
    <p className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary}`}>
      {value}
    </p>
  </div>
);

export default TransactionsTab;
