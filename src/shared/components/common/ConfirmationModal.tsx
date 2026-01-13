import React from 'react';
import { Modal } from '@/shared/components/ui/modal/Modal';
import Button from '@shared/components/ui/button/Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Confirming...' : 'Confirm'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;