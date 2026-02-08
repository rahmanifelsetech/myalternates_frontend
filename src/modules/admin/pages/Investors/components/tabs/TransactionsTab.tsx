import React, { useState } from 'react';
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
import Button from '@shared/components/ui/button/Button';
import { Modal } from '@shared/components/ui/modal/Modal';
import Input from '@shared/components/form/input/InputField';
import Select from '@shared/components/form/Select';
import Label from '@shared/components/form/Label';
import { DownloadIcon } from '@shared/icons';
import { Transaction } from '../../api/investorApi';
import { ApiService } from '@shared/services/ApiService';

export interface TransactionDownloadFilters {
  startDate: string;
  endDate: string;
  transactionType: string;
  investmentId: string;
  productId: string;
  amcId: string;
  schemeId: string;
}

interface TransactionsTabProps {
  investorId: string;
  accountId?: string;
  investmentAccountId?: string;
  transactions?: Transaction[];
  isLoading?: boolean;
  onDownload?: (filters: TransactionDownloadFilters) => void;
}


export const TransactionsTab: React.FC<TransactionsTabProps> = ({
  investorId,
  accountId,
  investmentAccountId,
  transactions = [],
  isLoading = false,
  onDownload,
}) => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionDownloadFilters>({
    startDate: '',
    endDate: '',
    transactionType: '',
    investmentId: '',
    productId: '',
    amcId: '',
    schemeId: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TransactionDownloadFilters, string>>>({});

  const handleFilterChange = (key: keyof TransactionDownloadFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const validateFilters = () => {
    const newErrors: Partial<Record<keyof TransactionDownloadFilters, string>> = {};
    if (!filters.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!filters.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (filters.startDate && filters.endDate && filters.startDate > filters.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (validateFilters() && accountId) {
      setIsDownloading(true);
      try {
        // Build query params from filters
        const params = new URLSearchParams();
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.transactionType) params.append('transactionType', filters.transactionType);
        if (filters.investmentId) params.append('investmentId', filters.investmentId);
        if (filters.productId) params.append('productId', filters.productId);
        if (filters.amcId) params.append('amcId', filters.amcId);
        if (filters.schemeId) params.append('schemeId', filters.schemeId);
        
        const url = `/investors/${investorId}/accounts/${accountId}/transactions/download?${params.toString()}`;
        await ApiService.downloadFile(url, `transactions_${new Date().toISOString().split('T')[0]}.csv`);
        setIsDownloadModalOpen(false);
      } catch (error) {
        console.error('Download failed:', error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      transactionType: '',
      investmentId: '',
      productId: '',
      amcId: '',
      schemeId: '',
    });
    setErrors({});
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading transactions...</div>;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <>
        <NoDataRow colSpan={6} message="No transactions found for this account." />
      </>
    );
  }

  // Inflows: Addition + Initial Purchase
  const inflowTransactions = transactions.filter(t => 
    t.transactionType === 'Addition' || t.transactionType === 'Initial Purchase'
  );
  const inflowCount = inflowTransactions.length;
  const totalInflows = inflowTransactions.reduce((sum, t) => sum + (parseFloat(t.amount || '0') || 0), 0);

  // Outflows: Withdrawn
  const outflowTransactions = transactions.filter(t => t.transactionType === 'Withdrawn');
  const outflowCount = outflowTransactions.length;
  const totalOutflows = outflowTransactions.reduce((sum, t) => sum + (parseFloat(t.amount || '0') || 0), 0);

  // Drawdowns: For AIF/GIFT products
  const drawdownTransactions = transactions.filter(t => t.transactionType === 'Drawdown');
  const drawdownCount = drawdownTransactions.length;
  const totalDrawdowns = drawdownTransactions.reduce((sum, t) => sum + (parseFloat(t.amount || '0') || 0), 0);

  const getTypeColor = (type: string): 'success' | 'warning' | 'error' | 'info' | 'primary' => {
    switch (type) {
      case 'Addition':
      case 'Initial Purchase':
        return 'success';
      case 'Withdrawn':
        return 'error';
      case 'Drawdown':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDownloadModalOpen(true)}
          startIcon={<DownloadIcon className="w-4 h-4" />}
        >
          Download
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FlowSummaryCard 
          label="Total Inflows"
          count={inflowCount}
          amount={totalInflows}
          type="inflow"
        />
        <FlowSummaryCard 
          label="Total Outflows"
          count={outflowCount}
          amount={totalOutflows}
          type="outflow"
        />
        <FlowSummaryCard 
          label="Total Drawdowns"
          count={drawdownCount}
          amount={totalDrawdowns}
          type="drawdown"
        />
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

      {/* Download Modal */}
      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        className="max-w-lg w-full"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Download Transactions</h3>
          <p className="text-sm text-gray-500 mb-4">
            Apply filters to download transactions. Date range is mandatory.
          </p>
          
          <div className="space-y-4">
            {/* Date Range - Mandatory */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  type="date"
                  id="startDate"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  error={!!errors.startDate}
                  hint={errors.startDate}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  type="date"
                  id="endDate"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  error={!!errors.endDate}
                  hint={errors.endDate}
                />
              </div>
            </div>

            {/* <div>
              <Label htmlFor="transactionType">Transaction Type</Label>
              <Select
                options={[
                  { value: '', label: 'All Types' },
                  { value: 'Addition', label: 'Addition' },
                  { value: 'Initial Purchase', label: 'Initial Purchase' },
                  { value: 'Withdrawn', label: 'Withdrawn' },
                  { value: 'Drawdown', label: 'Drawdown' },
                ]}
                placeholder="Select transaction type"
                onChange={(value) => handleFilterChange('transactionType', value)}
                defaultValue={filters.transactionType}
              />
            </div>

            <div>
              <Label htmlFor="investmentId">Investment ID</Label>
              <Input
                type="text"
                id="investmentId"
                placeholder="Enter investment ID"
                value={filters.investmentId}
                onChange={(e) => handleFilterChange('investmentId', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="productId">Product ID</Label>
              <Input
                type="text"
                id="productId"
                placeholder="Enter product ID"
                value={filters.productId}
                onChange={(e) => handleFilterChange('productId', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="amcId">AMC ID</Label>
              <Input
                type="text"
                id="amcId"
                placeholder="Enter AMC ID"
                value={filters.amcId}
                onChange={(e) => handleFilterChange('amcId', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="schemeId">Scheme ID</Label>
              <Input
                type="text"
                id="schemeId"
                placeholder="Enter scheme ID"
                value={filters.schemeId}
                onChange={(e) => handleFilterChange('schemeId', e.target.value)}
              />
            </div> */}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="plain" onClick={resetFilters}>
              Reset
            </Button>
            <Button variant="outline" onClick={() => setIsDownloadModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDownload} loading={isDownloading}>
              Download
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

interface FlowSummaryCardProps {
  label: string;
  count: number;
  amount: number;
  type: 'inflow' | 'outflow' | 'drawdown';
}

const FlowSummaryCard: React.FC<FlowSummaryCardProps> = ({ label, count, amount, type }) => {
  const getTypeColor = () => {
    switch (type) {
      case 'inflow':
        return 'text-green-600 dark:text-green-400';
      case 'outflow':
        return 'text-red-600 dark:text-red-400';
      case 'drawdown':
        return 'text-amber-600 dark:text-amber-400';
      default:
        return 'text-gray-900 dark:text-white';
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mb-3`}>
        {label}
      </p>
      <div className="flex items-end justify-between">
        <div>
          <p className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary}`}>
            {count}
          </p>
          <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>
            Transactions
          </p>
        </div>
        <div className="text-right">
          <p className={`${typographyClasses.heading.h4} ${getTypeColor()}`}>
            ₹{amount?.toLocaleString('en-IN', { maximumFractionDigits: 2 }) || 0}
          </p>
          <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>
            Total Amount
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTab;
