import React from 'react';
import { Control, UseFormRegister, UseFormWatch, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import DynamicFormField from '@/shared/components/form/FormField/DynamicFormField';
import Button from '@/shared/components/ui/button/Button';
import { TrashBinIcon } from '@/shared/icons';
import { InvestmentFlowSchemaType } from '../../schema/investmentFlowSchema';
import {
    idTypeOptions,
    relationshipOptions,
} from '../../types/investmentEnums';

interface NomineesStepProps {
    control: Control<InvestmentFlowSchemaType>;
    register: UseFormRegister<InvestmentFlowSchemaType>;
    getFieldError: (name: string) => any;
    watch: UseFormWatch<InvestmentFlowSchemaType>;
    nomineeFields: FieldArrayWithId<InvestmentFlowSchemaType, "nominees", "id">[];
    appendNominee: UseFieldArrayAppend<InvestmentFlowSchemaType, "nominees">;
    removeNominee: UseFieldArrayRemove;
}

export const NomineesStep: React.FC<NomineesStepProps> = ({
    control,
    register,
    getFieldError,
    watch,
    nomineeFields,
    appendNominee,
    removeNominee,
}) => {
    return (
        <div>
            {nomineeFields.map((field, index) => (
                <div key={field.id} className="border p-4 my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DynamicFormField control={control} label="Name" error={getFieldError(`nominees.${index}.name`)} {...register(`nominees.${index}.name`)} />
                    <DynamicFormField control={control} label="ID Type" type="select" options={idTypeOptions} error={getFieldError(`nominees.${index}.idType`)} {...register(`nominees.${index}.idType`)} />
                    <DynamicFormField control={control} label="ID Number" error={getFieldError(`nominees.${index}.idNumber`)} {...register(`nominees.${index}.idNumber`)} />
                    <DynamicFormField control={control} label="Relationship" type="select" options={relationshipOptions} error={getFieldError(`nominees.${index}.relationship`)} {...register(`nominees.${index}.relationship`)} />
                    <DynamicFormField control={control} label="Percentage" type="number" error={getFieldError(`nominees.${index}.percentage`)} {...register(`nominees.${index}.percentage`)} />
                    
                    <DynamicFormField control={control} label="Is Minor?" type="checkbox" error={getFieldError(`nominees.${index}.isMinor`)} {...register(`nominees.${index}.isMinor`)} />
                    
                    {watch(`nominees.${index}.isMinor`) && (
                        <>
                            <DynamicFormField control={control} label="Guardian Full Name" error={getFieldError(`nominees.${index}.guardian.fullName`)} {...register(`nominees.${index}.guardian.fullName`)} />
                            <DynamicFormField control={control} label="Guardian ID Type" type="select" options={idTypeOptions} error={getFieldError(`nominees.${index}.guardian.idType`)} {...register(`nominees.${index}.guardian.idType`)} />
                            <DynamicFormField control={control} label="Guardian ID Number" error={getFieldError(`nominees.${index}.guardian.idNumber`)} {...register(`nominees.${index}.guardian.idNumber`)} />
                            <DynamicFormField control={control} label="Guardian Relationship" error={getFieldError(`nominees.${index}.guardian.relationship`)} {...register(`nominees.${index}.guardian.relationship`)} />
                        </>
                    )}

                    <Button type="button" onClick={() => removeNominee(index)}><TrashBinIcon /></Button>
                </div>
            ))}
            {nomineeFields.length < 3 && (
                <Button type="button" onClick={() => appendNominee({ name: '', idType: '', idNumber: '', relationship: '', percentage: 0 })}>Add Nominee</Button>
            )}
        </div>
    );
};
