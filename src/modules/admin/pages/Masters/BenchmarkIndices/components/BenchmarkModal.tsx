import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/shared/components/ui/modal/Modal';
import Input from '@shared/components/form/input/InputField';
import Button from '@shared/components/ui/button/Button';
import { CreateBenchmarkPayload, Benchmark } from '../types/benchmark';
import { setFormErrors } from '@/shared/utils/formUtils';
import { ApiError } from '@/shared/types/api';
import { typographyClasses } from '@shared/utils/typographyUtils';

interface BenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBenchmarkPayload) => Promise<void>;
  benchmark?: Benchmark | null;
  isLoading?: boolean;
}

export const BenchmarkModal: React.FC<BenchmarkModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  benchmark,
  isLoading,
}) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<CreateBenchmarkPayload>();

  useEffect(() => {
    if (benchmark) {
      reset({
        name: benchmark.name,
        isActive: benchmark.isActive,
      });
    } else {
      reset({
        name: '',
        isActive: true,
      });
    }
  }, [benchmark, reset, isOpen]);

  const handleFormSubmit = async (data: CreateBenchmarkPayload) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error: any) {
      setFormErrors<CreateBenchmarkPayload>(
        error as ApiError,
        setError,
        ['name', 'isActive']
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h3 className={`${typographyClasses.heading.h4} mb-4 ${typographyClasses.colors.text.primary}`}>
        {benchmark ? 'Edit Benchmark Index' : 'Create Benchmark Index'}
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className={`${typographyClasses.form.label} block mb-1`}>
            Name
          </label>
          <Input
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            placeholder="Benchmark Name"
          />
          {errors.name && <span className={`${typographyClasses.form.error}`}>{errors.name.message}</span>}
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('isActive')}
              className="form-checkbox h-4 w-4 text-brand-500 transition duration-150 ease-in-out"
            />
            <span className={`${typographyClasses.form.label}`}>Active</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};