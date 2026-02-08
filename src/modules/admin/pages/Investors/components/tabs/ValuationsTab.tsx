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
import { Valuation } from '../../types/valuation';
import Button from '@shared/components/ui/button/Button';
import { Modal } from '@shared/components/ui/modal/Modal';
import Input from '@shared/components/form/input/InputField';
import Select from '@shared/components/form/Select';
import Label from '@shared/components/form/Label';
import { DownloadIcon } from '@shared/icons';
import { ApiService } from '@shared/services/ApiService';
import DatePicker from '@/shared/components/form/date-picker';

export interface ValuationDownloadFilters {
  startDate: string;
  endDate: string;
  investmentId: string;
  productId: string;
  amcId: string;
  schemeId: string;
}

interface ValuationsTabProps {
  investorId: string;
  accountId?: string;
  investmentAccountId?: string;
  valuations?: Valuation[];
  isLoading?: boolean;
  onDownload?: (filters: ValuationDownloadFilters) => void;
}


export const ValuationsTab: React.FC<ValuationsTabProps> = ({
  investorId,
  accountId,
  investmentAccountId,
  valuations = [],
  isLoading = false,
  onDownload,
}) => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [filters, setFilters] = useState<ValuationDownloadFilters>({
    startDate: '',
    endDate: '',
    investmentId: '',
    productId: '',
    amcId: '',
    schemeId: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ValuationDownloadFilters, string>>>({});

  const handleFilterChange = (key: keyof ValuationDownloadFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const validateFilters = () => {
    const newErrors: Partial<Record<keyof ValuationDownloadFilters, string>> = {};
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
        if (filters.investmentId) params.append('investmentId', filters.investmentId);
        if (filters.productId) params.append('productId', filters.productId);
        if (filters.amcId) params.append('amcId', filters.amcId);
        if (filters.schemeId) params.append('schemeId', filters.schemeId);
        
        const url = `/investors/${investorId}/accounts/${accountId}/daily-valuations/download?${params.toString()}`;
        await ApiService.downloadFile(url, `valuations_${new Date().toISOString().split('T')[0]}.csv`);
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
      investmentId: '',
      productId: '',
      amcId: '',
      schemeId: '',
    });
    setErrors({});
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading valuations...</div>;
  }

  if (!valuations || valuations.length === 0) {
    return (
      <>
        <NoDataRow colSpan={5} message="No valuations found for this account." />
      </>
    );
  }

  const totalAmount = valuations.reduce((sum, v) => sum + (parseFloat(v.valuationAmount || '0') || 0), 0);

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

      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SummaryCard label="Total Valuations" value={valuations.length.toString()} />
        <SummaryCard label="Total Valuation Amount" value={`₹${totalAmount?.toLocaleString('en-IN', { maximumFractionDigits: 2 }) || 0}`} />
      </div> */}

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
                  Valuation Date
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {valuations.map((valuation) => (
                <TableRow key={valuation.valuationId}>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    {valuation.product?.name || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {valuation.amc?.name || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {valuation.scheme?.schemeName || '-'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {formatDate(valuation.valuationDate)}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    ₹{parseFloat(valuation.valuationAmount || '0').toLocaleString('en-IN', { maximumFractionDigits: 2 })}
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
          <h3 className="text-lg font-semibold mb-4">Download Valuations</h3>
          <p className="text-sm text-gray-500 mb-4">
            Apply filters to download valuations. Date range is mandatory.
          </p>
          
          <div className="space-y-4">
            {/* Date Range - Mandatory */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <DatePicker
                  id="startDate"
                  value={filters.startDate}
                  onChange={(value) => handleFilterChange('startDate', value)}
                  error={!!errors.startDate}
                  hint={errors.startDate}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date *</Label>
                 <DatePicker
                  id="endDate"
                  value={filters.endDate}
                  onChange={(value) => handleFilterChange('endDate', value)}
                  error={!!errors.endDate}
                  hint={errors.endDate}
                />
              </div>
            </div>
          {/* 
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

export default ValuationsTab;
