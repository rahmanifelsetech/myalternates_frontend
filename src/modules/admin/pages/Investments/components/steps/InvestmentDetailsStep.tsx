import React from 'react';
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import DynamicFormField from '@/shared/components/form/FormField/DynamicFormField';
import { InvestmentFlowSchemaType } from '../../schema/investmentFlowSchema';

interface InvestmentDetailsStepProps {
    control: Control<InvestmentFlowSchemaType>;
    register: UseFormRegister<InvestmentFlowSchemaType>;
    getFieldError: (name: string) => any;
    productOptions: any[];
    amcOptions: any[];
    schemeOptions: any[];
    watch: UseFormWatch<InvestmentFlowSchemaType>;
    setValue: UseFormSetValue<InvestmentFlowSchemaType>;
}

export const InvestmentDetailsStep: React.FC<InvestmentDetailsStepProps> = ({
    control,
    register,
    getFieldError,
    productOptions,
    amcOptions,
    schemeOptions,
    watch,
    setValue
}) => {
    const watchProduct = watch('productId');
    const selectedProduct = productOptions.find((p: any) => p.value === watchProduct);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DynamicFormField control={control} label="Product" type="select" options={productOptions} error={getFieldError("productId")} {...register('productId')} />
            <DynamicFormField control={control} label="AMC Name" type="select" options={amcOptions} error={getFieldError("amcId")} {...register('amcId')} />
            <DynamicFormField control={control} label="AMC Client Code" error={getFieldError("amcClientCode")} {...register('amcClientCode')} />
            
            <DynamicFormField control={control} label="Strategy Name / Scheme" type="select" options={schemeOptions} error={getFieldError("schemeId")} {...register('schemeId')} />
            
            {(selectedProduct?.code === 'AIF' || selectedProduct?.code === 'GIFT_IFSC') && (
                <DynamicFormField control={control} label={`Capital Commitment${selectedProduct?.code === 'GIFT_IFSC' ? ' (USD)' : '(INR)'}`} type="number" error={getFieldError("capitalCommitment")} {...register('capitalCommitment')} />
            )}
            
            <DynamicFormField 
                control={control} 
                name="inceptionDate" 
                label="Inception Date" 
                type="date-picker"
                setValue={setValue}
                value={watch('inceptionDate')}
                error={getFieldError("inceptionDate")}
            />
            
            <DynamicFormField control={control} label="Fee Structure" error={getFieldError("feeStructure")} {...register('feeStructure')} />
            <DynamicFormField control={control} label="Remarks" type="textarea" error={getFieldError("remarks")} {...register('remarks')} />
        </div>
    );
};
