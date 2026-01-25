import React from 'react';
import { Modal } from '@shared/components/ui/modal/Modal';
import { BankForm } from '../../Banks/components/BankForm';
import { Bank } from '../../Banks/types/bank';
import { BankSchemaType } from '../../Banks/schema/bankSchema';

interface BankModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: BankSchemaType) => Promise<any>;
    bank?: Bank | null;
    investorId: string;
}

export const BankModal: React.FC<BankModalProps> = ({ isOpen, onClose, onSubmit, bank, investorId }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <BankForm bank={bank} onSubmit={onSubmit} isLoading={false} investorId={investorId} />
        </Modal>
    );
};
