import React from 'react';
import { Modal } from '@shared/components/ui/modal/Modal';
import { HolderForm } from '../../Holders/components/HolderForm';
import { Holder } from '../../Holders/types/holder';
import { HolderSchemaType } from '../../Holders/schema/holderSchema';

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
