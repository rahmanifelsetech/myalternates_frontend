import React, { useState, useEffect, useCallback } from 'react';
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
import Input from '@shared/components/form/input/InputField';
import { useHoldings } from '../../hooks/useHoldings';
import { useMarketList } from '@modules/admin/pages/Masters/MarketList/hooks/useMarketList';
import { useLazyGetMarketListByIsinQuery } from '@modules/admin/pages/Masters/MarketList/api/marketListApi';
import { Holding } from '../../types/holding';
import { MarketListModal } from '@modules/admin/pages/Masters/MarketList/components/MarketListModal';
import type { MarketList } from '@modules/admin/pages/Masters/MarketList/types/marketList';
import { PlusIcon } from '@shared/icons';
import { useToast } from '@/shared/hooks/useToast';

interface NewHoldingData {
  id: string;
  isinCode: string;
  securityType: string;
  portfolioWeightage: string;
  marketListId?: string;
  companyName?: string;
  sector?: string;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
  };
}

interface HoldingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  investorId: string;
  investmentId: string;
  holdings: Holding[];
  onSuccess?: () => void;
}

export const HoldingsModal: React.FC<HoldingsModalProps> = ({
  isOpen,
  onClose,
  investorId,
  investmentId,
  holdings = [],
  onSuccess,
}) => {
  const [holdingsAsOnDate, setHoldingsAsOnDate] = useState<string>('');
  const [editedHoldings, setEditedHoldings] = useState<Record<string, Partial<Holding>>>({});
  const [newHoldings, setNewHoldings] = useState<NewHoldingData[]>([]);
  const [showMarketListModal, setShowMarketListModal] = useState(false);
  const [selectedIsin, setSelectedIsin] = useState<string>('');
  const [pendingMarketListHoldingId, setPendingMarketListHoldingId] = useState<string | null>(null);
  const { handleUpdateHoldings, handleCreateHoldings, isUpdating, isCreating } = useHoldings();
  const { handleCreate: handleCreateMarketList, handleUpdate: handleUpdateMarketList } = useMarketList();
  const { error: showError } = useToast();

  // Initialize holdings data
  useEffect(() => {
    if (holdings.length > 0) {
      const firstHoldingDate = holdings[0]?.holdingsAsOnDate || holdings[0]?.valuationDate;
      setHoldingsAsOnDate(firstHoldingDate || new Date().toISOString().split('T')[0]);
      
      const initialEdits: Record<string, Partial<Holding>> = {};
      holdings.forEach(h => {
        initialEdits[h.holdingId] = {
          isinCode: h.isinCode,
          securityType: h.securityType,
          portfolioWeightage: h.portfolioWeightage,
          marketListId: h.marketListId
        };
      });
      setEditedHoldings(initialEdits);
    }
  }, [holdings]);

  // Add new holding row
  const addNewHoldingRow = () => {
    const newId = `new-${Date.now()}`;
    setNewHoldings(prev => [...prev, {
      id: newId,
      isinCode: '',
      securityType: '',
      portfolioWeightage: '',
    }]);
  };

  // Remove new holding row
  const removeNewHoldingRow = (id: string) => {
    setNewHoldings(prev => prev.filter(h => h.id !== id));
  };

  // Handle new holding field change
  const handleNewHoldingChange = useCallback((id: string, field: keyof NewHoldingData, value: string) => {
    setNewHoldings(prev => prev.map(h => 
      h.id === id ? { ...h, [field]: value } : h
    ));

    // Clear previous market list data when ISIN changes
    if (field === 'isinCode') {
      setNewHoldings(prev => prev.map(h => 
        h.id === id ? { 
          ...h, 
          [field]: value,
          marketListId: undefined,
          companyName: undefined,
          sector: undefined,
          categoryId: undefined,
          category: undefined,
        } : h
      ));
    }
  }, []);

  // Save new holdings
  const handleSaveNewHoldings = async () => {
    const allStockWeightage = holdings.reduce((sum, h) => sum + (parseFloat(editedHoldings[h.holdingId]?.portfolioWeightage || h.portfolioWeightage || '0') || 0), 0);
    const newHoldingsWeightage = newHoldings.reduce((sum, h) => sum + (parseFloat(h.portfolioWeightage || '0') || 0), 0);
    if(allStockWeightage + newHoldingsWeightage > 100) {
      showError(`Total weightage ${(allStockWeightage + newHoldingsWeightage).toFixed(2)}% cannot exceed 100%. Please adjust existing holdings before adding new ones.`);
      return;
    }
    let isMarketListMissing = false;
    const holdingsData = newHoldings.map(h => {
      if(!h.marketListId) isMarketListMissing = true;
      return ({
        isinCode: h.isinCode,
        securityType: h.securityType,
        portfolioWeightage: h.portfolioWeightage,
        marketListId: h.marketListId || undefined,
        securityName: h.companyName || undefined,
        categoryId: h.categoryId || undefined,
      })
    });

    if(isMarketListMissing) {
      showError('One or more new holdings are missing Market List linkage. Please ensure all ISINs are valid in Market List.');
      return;
    }
    
    await handleCreateHoldings(investmentId, { 
      holdingsAsOnDate, 
      holdings: holdingsData 
    });
    setNewHoldings([]);
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  // Save updated holdings
  const handleSave = async () => {
    const holdingsData = Object.entries(editedHoldings).map(([holdingId, data]) => ({
      holdingId,
      ...data,
    }));
    
    await handleUpdateHoldings(investmentId, {
      holdingsAsOnDate,
      holdings: holdingsData,
    });
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  // Calculate totals - Cash Equivalent auto-adjusts to maintain 100%
  const stockWeightage = holdings.reduce((sum, h) => sum + (parseFloat(editedHoldings[h.holdingId]?.portfolioWeightage || h.portfolioWeightage || '0') || 0), 0);
  const newHoldingsWeightage = newHoldings.reduce((sum, h) => sum + (parseFloat(h.portfolioWeightage || '0') || 0), 0);
  // Cash Equivalent auto-adjusts to maintain 100%
  const calculatedCashEquivalent = Math.max(0, 100 - (stockWeightage + newHoldingsWeightage));
  const totalWeightage = stockWeightage + newHoldingsWeightage + calculatedCashEquivalent;

  // Handle adding market list entry
  const handleAddMarketList = (isin: string, holdingId: string) => {
    setSelectedIsin(isin);
    setPendingMarketListHoldingId(holdingId);
    setShowMarketListModal(true);
  };

  // Handle successful market list creation
  const handleMarketListSuccess = (marketList: MarketList, holdingId?: string) => {
    console.log('Market List created/updated:', marketList, ' adding to holdingId:', pendingMarketListHoldingId || holdingId);
    if (pendingMarketListHoldingId || holdingId) {
      setNewHoldings(prev => prev.map(h => 
        (h.id === pendingMarketListHoldingId || h.id === holdingId) ? { 
          ...h,
          marketListId: marketList.id,
          companyName: marketList.companyName,
          sector: marketList.sector,
          categoryId: marketList.categoryId,
          category: marketList.category ? { id: marketList.categoryId || '', name: marketList.category.name || '' } : undefined,
        } : h
      ));
    }
    setPendingMarketListHoldingId(null);
  };

  return (
    <>
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

          {
            !newHoldings.length && (
              <div className="flex items-center justify-end gap-2">
                <Button size="sm" onClick={addNewHoldingRow}>
                  Add Holding
                </Button>
              </div>
            )
          }

          {newHoldings.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <div className='flex justify-between items-center pb-2 mb-2 border-b-2'>
                <h3 className={`${typographyClasses.body.default} ${typographyClasses.colors.text.primary}`}>
                  New Holdings ({newHoldings.length})
                </h3>
                <div className="flex items-center justify-end gap-2">
                  <Button size="sm" onClick={addNewHoldingRow}>
                    Add Holding
                  </Button>
                </div>
              </div>
              {newHoldings.map((newHolding, index) => (
                <NewHoldingRow
                  key={newHolding.id}
                  holding={newHolding}
                  index={index}
                  onChange={handleNewHoldingChange}
                  onRemove={removeNewHoldingRow}
                  onAddMarketList={handleAddMarketList}
                  onSuccess={handleMarketListSuccess}
                />
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
                            onChange={(e) => setEditedHoldings(prev => ({
                              ...prev,
                              [holding.holdingId]: {
                                ...prev[holding.holdingId],
                                isinCode: e.target.value,
                              },
                            }))}
                            placeholder="ISIN"
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <Input
                            type="text"
                            value={editedHoldings[holding.holdingId]?.securityType || holding.securityType || ''}
                            onChange={(e) => setEditedHoldings(prev => ({
                              ...prev,
                              [holding.holdingId]: {
                                ...prev[holding.holdingId],
                                securityType: e.target.value,
                              },
                            }))}
                            placeholder="Security Type"
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <Input
                            type="number"
                            value={editedHoldings[holding.holdingId]?.portfolioWeightage || holding.portfolioWeightage || ''}
                            onChange={(e) => setEditedHoldings(prev => ({
                              ...prev,
                              [holding.holdingId]: {
                                ...prev[holding.holdingId],
                                portfolioWeightage: e.target.value,
                              },
                            }))}
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
                        <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                          {holding.category?.name || '-'}
                        </TableCell>
                        {/* <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <Input
                            type="text"
                            value={editedHoldings[holding.holdingId]?.categorization || holding.categorization || ''}
                            onChange={(e) => setEditedHoldings(prev => ({
                              ...prev,
                              [holding.holdingId]: {
                                ...prev[holding.holdingId],
                                categorization: e.target.value,
                              },
                            }))}
                            placeholder="Category"
                            className="w-28"
                          />
                        </TableCell> */}
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
                Stock Weightage:
              </span>
              <span className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary}`}>
                {stockWeightage.toFixed(2)}%
              </span>
            </div>
            {newHoldings.length > 0 && (
              <div className="mt-2 flex items-center justify-between">
                <span className={`${typographyClasses.body.default} ${typographyClasses.colors.text.muted}`}>
                  New Holdings Weightage:
                </span>
                <span className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary}`}>
                  {newHoldingsWeightage.toFixed(2)}%
                </span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between">
              <span className={`${typographyClasses.body.default} ${typographyClasses.colors.text.muted}`}>
                Cash Equivalent:
              </span>
              <span className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary}`}>
                {calculatedCashEquivalent.toFixed(2)}%
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className={`${typographyClasses.body.default} ${typographyClasses.colors.text.muted}`}>
                Total Weightage:
              </span>
              <span className={`border-t-4 pt-2 ${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary}`}>
                {totalWeightage.toFixed(2)}%
              </span>
            </div>
          </div>
          {
            newHoldings.length > 0 ? (
              <div className="flex items-center justify-end gap-3">
                <Button variant="outline" onClick={() => setNewHoldings([])}>
                  Cancel New Holdings
                </Button>
                <Button onClick={handleSaveNewHoldings} loading={isCreating}>
                  Save {newHoldings.length} New Holding{newHoldings.length > 1 ? 's' : ''}
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave} loading={isUpdating}>
                  Save Changes
                </Button>
              </div>
            )
          }
        </div>
      </Modal>

      <MarketListModal
        isOpen={showMarketListModal}
        onClose={() => {
          setShowMarketListModal(false);
          setSelectedIsin('');
          setPendingMarketListHoldingId(null);
        }}
        initialData={{ isinCode: selectedIsin, asOnDate: holdingsAsOnDate } as MarketList}
        handleCreate={handleCreateMarketList}
        handleUpdate={handleUpdateMarketList}
        onSuccess={handleMarketListSuccess}
      />
    </>
  );
};

// New Holding Row Component with Market List Integration
interface NewHoldingRowProps {
  holding: NewHoldingData;
  index: number;
  onChange: (id: string, field: keyof NewHoldingData, value: string) => void;
  onRemove: (id: string) => void;
  onAddMarketList: (isin: string, holdingId: string) => void;
  onSuccess: (marketList: MarketList, holdingId?: string) => void;
}

const NewHoldingRow: React.FC<NewHoldingRowProps> = ({
  holding,
  index,
  onChange,
  onRemove,
  onAddMarketList,
  onSuccess,
}) => {
  const [trigger] = useLazyGetMarketListByIsinQuery();
  const [marketListData, setMarketListData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch market list data when ISIN changes (3+ chars)
  useEffect(() => {
    if (holding.isinCode.length >= 3) {
      setIsFetching(true);
      trigger(holding.isinCode, true) // true = force refetch, bypass cache
        .unwrap()
        .then((data) => {
          onSuccess(data.data, holding.id);
          setMarketListData(data);
        })
        .catch(() => {
          setMarketListData(null);
        })
        .finally(() => {
          setIsFetching(false);
        });
    } else {
      setMarketListData(null);
    }
  }, [holding.isinCode, trigger]);

  // Get market list fields - prefer holding prop data, fall back to fetched data
  const hasValidIsin = holding.isinCode.length >= 3;
  // Use holding prop data first (updated from parent onSuccess), fall back to fetched data
  const companyName = holding.companyName || (hasValidIsin && marketListData?.data ? marketListData.data.companyName : '');
  const sector = holding.sector || (hasValidIsin && marketListData?.data ? marketListData.data.sector : '');
  const categoryName = holding.category?.name || (hasValidIsin && marketListData?.data ? marketListData.data.category?.name || '' : '');
  const isLinked = hasValidIsin && !!(holding.marketListId || marketListData?.data);

  return (
    <div className="flex items-center gap-2 mb-4 last:mb-0 flex-wrap">
      <span className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} w-6`}>
        {index + 1}.
      </span>

      <Input
        type="text"
        value={holding.isinCode}
        onChange={(e) => onChange(holding.id, 'isinCode', e.target.value)}
        placeholder="ISIN"
        className="w-24"
      />
      
      <Input
        type="text"
        value={holding.securityType}
        onChange={(e) => onChange(holding.id, 'securityType', e.target.value)}
        placeholder="Security Type"
        className="w-24"
      />
      <Input
        type="number"
        value={holding.portfolioWeightage}
        onChange={(e) => onChange(holding.id, 'portfolioWeightage', e.target.value)}
        placeholder="Weightage"
        step={0.01}
        className="w-20"
      />
      {/* Show market list data or Add button */}
      {isLinked ? (
        <div className="flex items-center gap-2">
          <div className="w-32 text-center">
            <span className={`py-4 text-center ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
              {companyName}
            </span>
          </div>
          <div className="w-28 text-center">
            <span className={`py-4 text-center ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
              {sector}
            </span>
          </div>
          <div className="w-28 text-center">
            <span className={`py-4 text-center ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
              {categoryName}
            </span>
          </div>
          {/* <span className="text-xs text-green-600 dark:text-green-400">
            ✓ Linked
          </span> */}
        </div>
      ) : hasValidIsin && !isFetching ? (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAddMarketList(holding.isinCode, holding.id)}
          startIcon={<PlusIcon className="size-4" />}
        >
          Add to Market List
        </Button>
      ) : (
        <>
          <div className="w-32">
            <span className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
              -
            </span>
          </div>
          <div className="w-28">
            <span className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
              -
            </span>
          </div>
          <div className="w-28">
            <span className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
              -
            </span>
          </div>
        </>
      )}
      <Button size="sm" variant="outline" onClick={() => onRemove(holding.id)}>
        ×
      </Button>
    </div>
  );
};

export default HoldingsModal;
