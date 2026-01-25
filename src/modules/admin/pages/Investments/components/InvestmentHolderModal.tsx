import React from 'react';
import { Modal } from '@shared/components/ui/modal/Modal';
import InvestmentHolderForm from './InvestmentHolderForm';
import { Holder } from '../../Investors/types/holder';
import typographyClasses from '@/shared/utils/typographyUtils';

interface InvestmentHolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Holder;
  onSubmit: (data: Holder) => void;
  isLoading?: boolean;
}

const InvestmentHolderModal: React.FC<InvestmentHolderModalProps> = ({ isOpen, onClose, initialData, onSubmit, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
        <h3 className={`${typographyClasses.heading.h4} mb-4 ${typographyClasses.colors.text.primary}`}>
            {initialData?.id ? 'Update Holder' : 'Add Holder'}
        </h3>
      <InvestmentHolderForm initialData={initialData} onSubmit={onSubmit} onCancel={onClose} isLoading={isLoading} />
    </Modal>
  );
};

export default InvestmentHolderModal;
