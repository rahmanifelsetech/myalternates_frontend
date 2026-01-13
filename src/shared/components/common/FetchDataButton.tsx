import React from 'react';
import Button from '@shared/components/ui/button/Button';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { SyncIcon } from '@shared/icons';

interface FetchDataButtonProps {
  mutationHook: () => any;
  buttonText?: string;
  onSuccess?: () => void;
  successMessage?: string;
  errorMessage?: string;
}

const FetchDataButton: React.FC<FetchDataButtonProps> = ({
  mutationHook,
  buttonText = 'Fetch Data',
  onSuccess,
  successMessage = 'Data fetched successfully!',
  errorMessage = 'Failed to fetch data.',
}) => {
  const [fetchData, { isLoading }] = mutationHook();
  const { execute } = useAsyncMutation();

  const handleClick = async () => {
    await execute(fetchData, undefined, {
      successMessage,
      errorMessage,
      onSuccess,
    });
  };

  return (
    <Button variant='outline' onClick={handleClick} disabled={isLoading} startIcon={<SyncIcon />}>
      {isLoading ? 'Fetching...' : buttonText}
    </Button>
  );
};

export default FetchDataButton;