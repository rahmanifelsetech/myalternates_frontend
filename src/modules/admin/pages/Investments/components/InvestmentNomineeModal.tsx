import React from 'react';
import { Modal } from '@shared/components/ui/modal/Modal';
import InvestmentNomineeForm from './InvestmentNomineeForm';
import { Nominee } from '../../Investors/types/nominee';
import typographyClasses from '@/shared/utils/typographyUtils';

interface InvestmentNomineeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Nominee;
  onSubmit: (data: Nominee) => void;
  isLoading?: boolean;
}

const InvestmentNomineeModal: React.FC<InvestmentNomineeModalProps> = ({ isOpen, onClose, initialData, onSubmit, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
        <h3 className={`${typographyClasses.heading.h4} mb-4 ${typographyClasses.colors.text.primary}`}>
            {initialData?.id ? 'Update Nominee' : 'Add Nominee'}
        </h3>      
        <InvestmentNomineeForm initialData={initialData} onSubmit={onSubmit} onCancel={onClose} isLoading={isLoading} />
    </Modal>
  );
};

export default InvestmentNomineeModal;
