import React from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import DynamicFormField from '@/shared/components/form/FormField/DynamicFormField';
import { InvestmentFlowSchemaType } from '../../schema/investmentFlowSchema';
import {
    dpTypeOptions,
    accountTypeOptions,
} from '../../types/investmentEnums';

interface DpAndBankStepProps {
    control: Control<InvestmentFlowSchemaType>;
    register: UseFormRegister<InvestmentFlowSchemaType>;
    getFieldError: (name: string) => any;
    bankOptions: any[];
}

export const DpAndBankStep: React.FC<DpAndBankStepProps> = ({
    control,
    register,
    getFieldError,
    bankOptions,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DynamicFormField control={control} label="DP Type" type="select" options={dpTypeOptions} error={getFieldError("dpType")} {...register('dpType')} />
            <DynamicFormField control={control} label="DP Name" error={getFieldError("dpName")} {...register('dpName')} />
            <DynamicFormField control={control} label="DP ID" error={getFieldError("dpId")} {...register('dpId')} />
            <DynamicFormField control={control} label="Client ID" error={getFieldError("clientId")} {...register('clientId')} />
            <DynamicFormField control={control} label="Bank" type="select" options={bankOptions} error={getFieldError("bankId")} {...register('bankId')} disabled={!bankOptions.length} />
            <DynamicFormField control={control} label="Bank Name" error={getFieldError("bankName")} {...register('bankName')} />
            <DynamicFormField control={control} label="Account Number" error={getFieldError("accountNumber")} {...register('accountNumber')} />
            <DynamicFormField control={control} label="IFSC" error={getFieldError("ifsc")} {...register('ifsc')} />
            <DynamicFormField control={control} label="Account Type" type="select" options={accountTypeOptions} error={getFieldError("accountType")} {...register('accountType')} />
        </div>
    );
};
