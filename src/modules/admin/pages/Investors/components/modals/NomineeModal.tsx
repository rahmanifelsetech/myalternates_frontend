import React from 'react';
import { Modal } from '@shared/components/ui/modal/Modal';
import { NomineeForm } from '../forms/NomineeForm';
import { Nominee } from '../../types/nominee';
import { NomineeSchemaType } from '../../schema/nomineeSchema';

interface NomineeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: NomineeSchemaType) => Promise<any>;
    nominee?: Nominee | null;
    investorId: string;
}

export const NomineeModal: React.FC<NomineeModalProps> = ({ isOpen, onClose, onSubmit, nominee, investorId }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <NomineeForm nominee={nominee} onSubmit={onSubmit} isLoading={false} />
        </Modal>
    );
};
