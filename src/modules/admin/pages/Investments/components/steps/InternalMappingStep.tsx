import React from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import DynamicFormField from '@/shared/components/form/FormField/DynamicFormField';
import { InvestmentFlowSchemaType } from '../../schema/investmentFlowSchema';

interface InternalMappingStepProps {
    control: Control<InvestmentFlowSchemaType>;
    register: UseFormRegister<InvestmentFlowSchemaType>;
    getFieldError: (name: string) => any;
    cpOptions: any[];
    creOptions: any[];
    rmOptions: any[];
    fmOptions: any[];
}

export const InternalMappingStep: React.FC<InternalMappingStepProps> = ({
    control,
    register,
    getFieldError,
    cpOptions,
    creOptions,
    rmOptions,
    fmOptions,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DynamicFormField control={control} label="Distributor Name" type="select" options={cpOptions} error={getFieldError("cpId")} {...register('cpId')} />
            {/* <DynamicFormField control={control} label="CP Code" disabled={true} error={getFieldError("cpCode")} {...register('cpCode')} /> */}
            <DynamicFormField control={control} label="CRE Name" type="select" options={creOptions} error={getFieldError("creId")} {...register('creId')} />
            {/* <DynamicFormField control={control} label="CRE Code" disabled={true} error={getFieldError("creCode")} {...register('creCode')} /> */}
            <DynamicFormField control={control} label="RM Name" type="select" options={rmOptions} error={getFieldError("rmId")} {...register('rmId')} />
            <DynamicFormField control={control} label="Branch Code" error={getFieldError("branchCode")} {...register('branchCode')} />
            {/* <DynamicFormField control={control} label="RM Code" disabled={true} error={getFieldError("rmCode")} {...register('rmCode')} /> */}
            <DynamicFormField control={control} label="FM Name" type="select" options={fmOptions} error={getFieldError("fmId")} {...register('fmId')} />
            {/* <DynamicFormField control={control} label="FM Code" disabled={true} error={getFieldError("fmCode")} {...register('fmCode')} /> */}
        </div>
    );
};
