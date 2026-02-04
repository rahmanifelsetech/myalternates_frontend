import { useUpdateHoldingsMutation, useCreateHoldingMutation } from '../api/investorApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { useCallback } from 'react';
import { Holding } from '../types/holding';

interface UpdateHoldingsPayload {
  holdingsAsOnDate: string;
  holdings: Partial<Holding>[];
}

interface CreateHoldingsPayload {
  holdings: Partial<Holding>[];
}

export const useHoldings = () => {
  const [updateHoldingsMutation, { isLoading: isUpdating }] = useUpdateHoldingsMutation();
  const [createHoldingMutation, { isLoading: isCreating }] = useCreateHoldingMutation();

  const { execute: update } = useAsyncMutation();
  const { execute: create } = useAsyncMutation();

  const handleUpdateHoldings = useCallback(async (
    investmentId: string,
    data: UpdateHoldingsPayload
  ) => {
    return await update(
      updateHoldingsMutation,
      { investmentId, holdingsAsOnDate: data.holdingsAsOnDate, holdings: data.holdings },
      {
        successMessage: 'Holdings updated successfully!',
        errorMessage: 'Failed to update holdings.',
      }
    );
  }, [update, updateHoldingsMutation]);

  const handleCreateHoldings = useCallback(async (
    investmentId: string,
    data: CreateHoldingsPayload
  ) => {
    return await create(
      createHoldingMutation,
      { investmentId, holdings: data.holdings },
      {
        successMessage: 'Holdings created successfully!',
        errorMessage: 'Failed to create holdings.',
      }
    );
  }, [create, createHoldingMutation]);

  return {
    handleUpdateHoldings,
    handleCreateHoldings,
    isUpdating,
    isCreating,
  };
};
