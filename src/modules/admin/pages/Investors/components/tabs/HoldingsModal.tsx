import React, { useState, useEffect } from 'react';
import { Modal } from '@shared/components/ui/modal/Modal';
import Button from '@shared/components/ui/button/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { typographyClasses } from '@shared/utils/typographyUtils';
import NoDataRow from '@shared/components/common/NoDataRow';
import Badge from '@shared/components/ui/badge/Badge';
import Input from '@shared/components/form/input/InputField';
import { ReactSelectComponent, SelectOption } from '@shared/components/form/select/ReactSelect';
import { useHoldings } from '../../hooks/useHoldings';
import { useGetCategoriesQuery } from '@modules/admin/pages/Categories/api/categoryApi';
import { Category } from '@modules/admin/pages/Categories/types/category';
import { Holding } from '../../types/holding';

interface NewHoldingData {
  id: string;
  isinCode: string;
  securityType: string;
  portfolioWeightage: string;
  companyName: string;
  sector: string;
  categoryId: string;
}

interface HoldingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  investorId: string;
  investmentId: string;
  holdings: Holding[];
}

export const HoldingsModal: React.FC<HoldingsModalProps> = ({
  isOpen,
  onClose,
  investorId,
  investmentId,
  holdings = [],
}) => {
  const [holdingsAsOnDate, setHoldingsAsOnDate] = useState<string>('');
  const [editedHoldings, setEditedHoldings] = useState<Record<string, Partial<Holding>>>({});
  const [editedCategoryIds, setEditedCategoryIds] = useState<Record<string, string>>({});
  const [newHoldings, setNewHoldings] = useState<NewHoldingData[]>([]);
  const { handleUpdateHoldings, handleCreateHoldings, isUpdating, isCreating } = useHoldings();
  
  // Fetch categories for dropdown
  const { data: categoriesData } = useGetCategoriesQuery({limit: 100});
  const categories: Category[] = categoriesData?.data || [];

  useEffect(() => {
    if (holdings.length > 0) {
      const firstHoldingDate = holdings[0]?.holdingsAsOnDate || holdings[0]?.valuationDate;
      setHoldingsAsOnDate(firstHoldingDate || new Date().toISOString().split('T')[0]);
      
      const initialEdits: Record<string, Partial<Holding>> = {};
      const initialCategoryIds: Record<string, string> = {};
      holdings.forEach(h => {
        initialEdits[h.holdingId] = {
          isinCode: h.isinCode,
          securityType: h.securityType,
          portfolioWeightage: h.portfolioWeightage,
        };
        if (h.category?.id) {
          initialCategoryIds[h.holdingId] = h.category.id;
        }
      });
      setEditedHoldings(initialEdits);
      setEditedCategoryIds(initialCategoryIds);
    }
  }, [holdings]);

  const handleFieldChange = (holdingId: string, field: keyof Holding, value: string) => {
    setEditedHoldings(prev => ({
      ...prev,
      [holdingId]: {
        ...prev[holdingId],
        [field]: value,
      },
    }));
  };

  const handleCategoryChange = (holdingId: string, categoryId: string) => {
    setEditedCategoryIds(prev => ({
      ...prev,
      [holdingId]: categoryId,
    }));
  };

  const addNewHoldingRow = () => {
    const newId = `new-${Date.now()}`;
    setNewHoldings(prev => [...prev, {
      id: newId,
      isinCode: '',
      securityType: '',
      portfolioWeightage: '',
      companyName: '',
      sector: '',
      categoryId: '',
    }]);
  };

  const removeNewHoldingRow = (id: string) => {
    setNewHoldings(prev => prev.filter(h => h.id !== id));
  };

  const handleNewHoldingChange = (id: string, field: keyof NewHoldingData, value: string) => {
    setNewHoldings(prev => prev.map(h => 
      h.id === id ? { ...h, [field]: value } : h
    ));
  };

  const handleSaveNewHoldings = async () => {
    const holdingsData = newHoldings.map(h => ({
      isinCode: h.isinCode,
      securityType: h.securityType,
      portfolioWeightage: h.portfolioWeightage,
      companyName: h.companyName,
      sector: h.sector,
      categoryId: h.categoryId,
    }));
    
    await handleCreateHoldings(investmentId, { holdings: holdingsData });
    setNewHoldings([]);
  };

  const handleSave = async () => {
    const holdingsData = Object.entries(editedHoldings).map(([holdingId, data]) => ({
      holdingId,
      ...data,
      categoryId: editedCategoryIds[holdingId] || holdings.find(h => h.holdingId === holdingId)?.category?.id || '',
    }));
    
    await handleUpdateHoldings(investmentId, {
      holdingsAsOnDate,
      holdings: holdingsData,
    });
    onClose();
  };

  const totalWeightage = holdings.reduce((sum, h) => sum + (parseFloat(editedHoldings[h.holdingId]?.portfolioWeightage || h.portfolioWeightage || '0') || 0), 0);
  const totalCashEquivalent = holdings[0]?.cashEquivalent ? parseFloat(holdings[0].cashEquivalent || '0') : 0;

  // Convert categories to select options
  const categoryOptions: SelectOption[] = categories.map((cat: Category) => ({
    label: cat.name,
    value: cat.id,
  }));

  // Get selected category option
  const getCategoryOption = (categoryId: string): SelectOption | null => {
    const category = categories.find((c: Category) => c.id === categoryId);
    return category ? { label: category.name, value: category.id } : null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[1200px] p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h2 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary}`}>
            Update Holdings
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
            ({holdings.length} holdings)
          </span>
          <span className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
            As On Date:
          </span>
          <input
            type="date"
            value={holdingsAsOnDate}
            onChange={(e) => setHoldingsAsOnDate(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button size="sm" onClick={addNewHoldingRow}>
            Add Holding
          </Button>
          {newHoldings.length > 0 && (
            <Button size="sm" onClick={handleSaveNewHoldings} loading={isCreating}>
              Save {newHoldings.length} New Holding{newHoldings.length > 1 ? 's' : ''}
            </Button>
          )}
        </div>

        {newHoldings.length > 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <h3 className={`${typographyClasses.body.default} ${typographyClasses.colors.text.primary} mb-4`}>
              New Holdings ({newHoldings.length})
            </h3>
            {newHoldings.map((newHolding, index) => (
              <div key={newHolding.id} className="flex items-center gap-2 mb-4 last:mb-0 flex-wrap">
                <span className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} w-6`}>
                  {index + 1}.
                </span>
                <Input
                  type="text"
                  value={newHolding.isinCode}
                  onChange={(e) => handleNewHoldingChange(newHolding.id, 'isinCode', e.target.value)}
                  placeholder="ISIN"
                  className="w-24"
                />
                <Input
                  type="text"
                  value={newHolding.securityType}
                  onChange={(e) => handleNewHoldingChange(newHolding.id, 'securityType', e.target.value)}
                  placeholder="Security Type"
                  className="w-24"
                />
                <Input
                  type="number"
                  value={newHolding.portfolioWeightage}
                  onChange={(e) => handleNewHoldingChange(newHolding.id, 'portfolioWeightage', e.target.value)}
                  placeholder="Weightage"
                  step={0.01}
                  className="w-20"
                />
                <Input
                  type="text"
                  value={newHolding.companyName}
                  onChange={(e) => handleNewHoldingChange(newHolding.id, 'companyName', e.target.value)}
                  placeholder="Company Name"
                  className="w-32"
                />
                <Input
                  type="text"
                  value={newHolding.sector}
                  onChange={(e) => handleNewHoldingChange(newHolding.id, 'sector', e.target.value)}
                  placeholder="Sector"
                  className="w-24"
                />
                <div className="w-40">
                  <ReactSelectComponent
                    options={categoryOptions}
                    value={newHolding.categoryId ? getCategoryOption(newHolding.categoryId) : null}
                    onChange={(option) => handleNewHoldingChange(newHolding.id, 'categoryId', String((option as SelectOption)?.value || ''))}
                    placeholder="Category"
                    isClearable
                  />
                </div>
                <Button size="sm" variant="outline" onClick={() => removeNewHoldingRow(newHolding.id)}>
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}

        {holdings.length === 0 && newHoldings.length === 0 ? (
          <NoDataRow colSpan={7} message="No holdings found for this investment." />
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                      ISIN
                    </TableCell>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                      Security Type
                    </TableCell>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                      Weightage (%)
                    </TableCell>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                      Company Name
                    </TableCell>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                      Sector
                    </TableCell>
                    <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                      Category
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {holdings.map((holding) => (
                    <TableRow key={holding.holdingId}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <Input
                          type="text"
                          value={editedHoldings[holding.holdingId]?.isinCode || holding.isinCode || ''}
                          onChange={(e) => handleFieldChange(holding.holdingId, 'isinCode', e.target.value)}
                          placeholder="ISIN"
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <Input
                          type="text"
                          value={editedHoldings[holding.holdingId]?.securityType || holding.securityType || ''}
                          onChange={(e) => handleFieldChange(holding.holdingId, 'securityType', e.target.value)}
                          placeholder="Security Type"
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <Input
                          type="number"
                          value={editedHoldings[holding.holdingId]?.portfolioWeightage || holding.portfolioWeightage || ''}
                          onChange={(e) => handleFieldChange(holding.holdingId, 'portfolioWeightage', e.target.value)}
                          placeholder="Weightage"
                          step={0.01}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                        {holding.companyName || holding.securityName || '-'}
                      </TableCell>
                      <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                        {holding.sector || '-'}
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="w-40">
                          <ReactSelectComponent
                            options={categoryOptions}
                            value={getCategoryOption(editedCategoryIds[holding.holdingId] || holding.category?.id || '')}
                            onChange={(option) => handleCategoryChange(holding.holdingId, String((option as SelectOption)?.value || ''))}
                            placeholder="Category"
                            isClearable
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <span className={`${typographyClasses.body.default} ${typographyClasses.colors.text.muted}`}>
              Total Weightage:
            </span>
            <span className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary}`}>
              {totalWeightage.toFixed(2)}%
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className={`${typographyClasses.body.default} ${typographyClasses.colors.text.muted}`}>
              Cash Equivalent:
            </span>
            <span className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary}`}>
              {totalCashEquivalent.toLocaleString('en-IN', { maximumFractionDigits: 2 })}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={isUpdating}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default HoldingsModal;
