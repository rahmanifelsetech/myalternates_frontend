import React, { useCallback, useMemo } from 'react';
import { Modal } from '@/shared/components/ui/modal/Modal';
import Button from '@shared/components/ui/button/Button';
import { ReactSelectComponent } from '@shared/components/form/select/ReactSelect';
import { typographyClasses } from '@shared/utils/typographyUtils';
import type { SelectOption } from '@shared/components/form/select/ReactSelect';
import type { UploadType, ExternalApiJobType } from '../types/upload';
import { FileUploader } from '@/shared/components/common/FileUploader';

interface EntitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedEntity: string) => Promise<void>;
  isLoading?: boolean;
  type: 'file-upload' | 'external-api';
  options: Array<{ label: string; value: string }>;
  selectedValue: string;
  onSelectedValueChange: (value: string) => void;
  onFileChange?: (file: File | null) => void;
  file?: File | null;
}

export const EntitySelectionModal: React.FC<EntitySelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  type,
  options,
  selectedValue,
  onSelectedValueChange,
  onFileChange,
  file,
}) => {
  const handleConfirm = useCallback(async () => {
    if (selectedValue) {
      try {
        await onConfirm(selectedValue);
        onSelectedValueChange('');
        onClose();
      } catch (error) {
        // Error is handled by useAsyncMutation hook
      }
    }
  }, [selectedValue, onConfirm, onSelectedValueChange, onClose]);

  const selectValue = useMemo(() => {
    if (!selectedValue) return null;
    const option = options.find(o => o.value === selectedValue);
    return option ? { label: option.label, value: option.value } : null;
  }, [selectedValue, options]);

  const handleSelectChange = useCallback((option: SelectOption | null) => {
    onSelectedValueChange(option?.value?.toString() || '');
  }, [onSelectedValueChange]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='max-w-lg p-6'>
      <div className="p-6 w-full max-w-md">
        <h3 className={`${typographyClasses.heading.h4} mb-4 ${typographyClasses.colors.text.primary}`}>
          {type === 'file-upload' ? 'Select Upload Type' : 'Select Entity for API Fetch'}
        </h3>

        <div className="mb-6">
          <label className={`${typographyClasses.form.label} mb-3 block ${typographyClasses.colors.text.primary}`}>
            {type === 'file-upload' ? 'Upload Type' : 'Entity'}
          </label>
          <ReactSelectComponent
            options={options as SelectOption[]}
            value={selectValue}
            onChange={(opt: any) => handleSelectChange(opt)}
            placeholder="Select an option..."
            isSearchable
            isClearable
            isDisabled={isLoading}
          />
        </div>

        {type === 'file-upload' && (
          <div className="mb-6">
            <FileUploader
              label="Choose a file to upload"
              onChange={onFileChange}
              accept={{
                'text/csv': ['.csv'],
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                'application/vnd.ms-excel': ['.xls']
              }}
            />
          </div>
        )}

        <div className="flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            loading={isLoading}
            disabled={!selectedValue || (type === 'file-upload' && !file) || isLoading}
          >
            {type === 'file-upload' ? 'Upload' : 'Fetch Data'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
