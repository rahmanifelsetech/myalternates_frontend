import React from 'react';
import { Modal } from '@/shared/components/ui/modal/Modal';
import Button from '@/shared/components/ui/button/Button';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} className='bg-brand-500 hover:bg-brand-600 text-white'>
                    {confirmText}
                </Button>
            </div>
        </Modal>
    );
};
