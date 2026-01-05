import React from 'react';
import { Modal } from '@shared/components/ui/modal';
import { FundManager } from '../types/fundManager';
import { FundManagerForm } from './FundManagerForm';

interface FundManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<any>;
  fundManager?: FundManager | null;
  isLoading?: boolean;
}

export const FundManagerModal: React.FC<FundManagerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  fundManager,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-10">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {fundManager ? 'Edit Fund Manager' : 'Create Fund Manager'}
      </h3>
      <FundManagerForm
        fundManager={fundManager}
        onSubmit={onSubmit}
        isLoading={isLoading}
        onCancel={onClose}
      />
    </Modal>
  );
};