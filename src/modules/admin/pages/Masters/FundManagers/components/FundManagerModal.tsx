import React from 'react';
import { Modal } from '@/shared/components/ui/modal/Modal';
import { FundManager } from '../types/fundManager';
import { FundManagerForm } from './FundManagerForm';
import { typographyClasses } from '@shared/utils/typographyUtils';

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
      <h3 className={`${typographyClasses.heading.h4} mb-4 ${typographyClasses.colors.text.primary}`}>
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