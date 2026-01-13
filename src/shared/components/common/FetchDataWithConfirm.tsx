import React, { useState } from 'react';
import FetchDataButton from './FetchDataButton';
import ConfirmationModal from './ConfirmationModal';
import Button from '../ui/button/Button';
import { SyncIcon } from '@/shared/icons';

interface FetchDataWithConfirmProps {
  onConfirm: () => void;
  buttonText?: string;
  modalTitle: string;
  modalDescription: string;
  isLoading?: boolean;
}

const FetchDataWithConfirm: React.FC<FetchDataWithConfirmProps> = ({
  onConfirm,
  buttonText,
  modalTitle,
  modalDescription,
  isLoading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} disabled={isLoading} startIcon={<SyncIcon />}>
        {isLoading ? 'Fetching...' : buttonText}
      </Button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={modalTitle}
        description={modalDescription}
        isLoading={isLoading}
      />
    </>
  );
};

export default FetchDataWithConfirm;