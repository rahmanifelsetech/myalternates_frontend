import React from 'react';
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import DynamicFormField from '@/shared/components/form/FormField/DynamicFormField';
import { InvestmentFlowSchemaType } from '../../schema/investmentFlowSchema';

interface DrawdownsStepProps {
    control: Control<InvestmentFlowSchemaType>;
    register: UseFormRegister<InvestmentFlowSchemaType>;
    getFieldError: (name: string) => any;
    setValue: UseFormSetValue<InvestmentFlowSchemaType>;
    watch: UseFormWatch<InvestmentFlowSchemaType>;
}

export const DrawdownsStep: React.FC<DrawdownsStepProps> = ({
    control,
    register,
    getFieldError,
    setValue,
    watch,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DynamicFormField control={control} label="Drawdown Number" error={getFieldError("drawdownNumber")} {...register('drawdownNumber')} />
            <DynamicFormField control={control} label="Payment Reference" error={getFieldError("paymentReference")} {...register('paymentReference')} />
            <DynamicFormField control={control} label="Drawdown Amount" type="number" error={getFieldError("drawdownAmount")} {...register('drawdownAmount')} />
            <DynamicFormField control={control} label="Drawdown Percentage" type="number" error={getFieldError("drawdownPercentage")} {...register('drawdownPercentage')} />
            <DynamicFormField 
                control={control} 
                name="paymentDueDate" 
                label="Payment Due Date" 
                type="date-picker"
                setValue={setValue}
                value={watch('paymentDueDate')}
                error={getFieldError("paymentDueDate")}
            />
            <DynamicFormField 
                control={control} 
                name="paymentReceivedDate" 
                label="Payment Received Date" 
                type="date-picker"
                setValue={setValue}
                value={watch('paymentReceivedDate')}
                error={getFieldError("paymentReceivedDate")}
            />
            <DynamicFormField control={control} label="Late Fee / Interest" type="number" error={getFieldError("lateFee")} {...register('lateFee')} />
            <DynamicFormField 
                control={control} 
                name="nextDueDate" 
                label="Next Due Date" 
                type="date-picker"
                setValue={setValue}
                value={watch('nextDueDate')}
                error={getFieldError("nextDueDate")}
            />
        </div>
    );
};
