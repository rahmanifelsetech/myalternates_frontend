import React from 'react';
import { Modal } from '@shared/components/ui/modal/Modal';
import { HolderForm } from '../forms/HolderForm';
import { Holder } from '../../types/holder';
import { HolderSchemaType } from '../../schema/holderSchema';

interface HolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: HolderSchemaType) => Promise<any>;
    holder?: Holder | null;
    investorId: string;
}

export const HolderModal: React.FC<HolderModalProps> = ({ isOpen, onClose, onSubmit, holder, investorId }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <HolderForm holder={holder} onSubmit={onSubmit} isLoading={false} investorId={investorId} />
        </Modal>
    );
};
