import React from 'react';
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import DynamicFormField from '@/shared/components/form/FormField/DynamicFormField';
import Button from '@/shared/components/ui/button/Button';
import { TrashBinIcon } from '@/shared/icons';
import { InvestmentFlowSchemaType } from '../../schema/investmentFlowSchema';
import {
    HoldingMode,
    holdingModeOptions,
    genderOptions,
    ResidentialStatus,
    residentialStatusOptions,
    subStatusOptions,
    idTypeOptions,
} from '../../types/investmentEnums';

interface HoldersStepProps {
    control: Control<InvestmentFlowSchemaType>;
    register: UseFormRegister<InvestmentFlowSchemaType>;
    getFieldError: (name: string) => any;
    setValue: UseFormSetValue<InvestmentFlowSchemaType>;
    watch: UseFormWatch<InvestmentFlowSchemaType>;
    holderFields: FieldArrayWithId<InvestmentFlowSchemaType, "holders", "id">[];
    appendHolder: UseFieldArrayAppend<InvestmentFlowSchemaType, "holders">;
    removeHolder: UseFieldArrayRemove;
    handleInvestorUniqueIdBlur: (e: React.FocusEvent<HTMLInputElement>, index: number) => void;
    formErrors: any;
}

export const HoldersStep: React.FC<HoldersStepProps> = ({
    control,
    register,
    getFieldError,
    setValue,
    watch,
    holderFields,
    appendHolder,
    removeHolder,
    handleInvestorUniqueIdBlur,
    formErrors
}) => {
    const watchHoldingMode = watch('holdingMode');
    const watchResidentialStatus = watch('investorResidentialStatus');

    return (
        <div>
            <div className="mb-4">
                <DynamicFormField control={control} label="Holding Mode" type="select" options={holdingModeOptions} error={getFieldError("holdingMode")} {...register(`holdingMode`)} />
            </div>
            
            <div className="mb-4 p-4 border-1 border-brand-400 rounded-lg">
                <h4 className="font-semibold mb-3">Primary Holder</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DynamicFormField 
                        control={control} 
                        label="PAN" 
                        error={getFieldError("holders.0.pan")} 
                        {...register('holders.0.pan')} 
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleInvestorUniqueIdBlur(e, 0)} 
                    />
                    <DynamicFormField control={control} label="Myalt Code" error={getFieldError("investorMyaltCode")} {...register('investorMyaltCode')} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleInvestorUniqueIdBlur(e, 0)} />
                    <DynamicFormField control={control} label="Name" error={getFieldError("holders.0.name")} {...register('holders.0.name')} />
                    <DynamicFormField 
                        control={control} 
                        name="holders.0.dob" 
                        label="DOB" 
                        type="date-picker" 
                        setValue={setValue}
                        value={watch('holders.0.dob')}
                        error={getFieldError("holders.0.dob")}
                    />
                    <DynamicFormField control={control} label="Gender" type="select" options={genderOptions} error={getFieldError("holders.0.gender")} {...register('holders.0.gender')} />
                    <DynamicFormField control={control} label="Mobile" error={getFieldError("holders.0.mobile")} {...register('holders.0.mobile')} />
                    <DynamicFormField control={control} label="Email" error={getFieldError("holders.0.email")} {...register('holders.0.email')} />

                    <DynamicFormField 
                        control={control} 
                        label="Residential Status" 
                        type="select" 
                        options={residentialStatusOptions}
                        error={getFieldError("investorResidentialStatus")}
                        {...register('investorResidentialStatus')}
                    />
                    {watchResidentialStatus === ResidentialStatus.NON_INDIVIDUAL && (
                        <DynamicFormField 
                            control={control} 
                            label="Sub Status" 
                            type="select" 
                            options={subStatusOptions}
                            error={getFieldError("investorSubStatus")}
                            {...register('investorSubStatus')}
                        />
                    )}
                    
                    <h3 className="col-span-full font-semibold mt-4 mb-2">Address</h3>
                    <DynamicFormField control={control} label="Address Line 1" error={getFieldError("holders.0.address.addressLine1")} {...register('holders.0.address.addressLine1')} />
                    <DynamicFormField control={control} label="Address Line 2" error={getFieldError("holders.0.address.addressLine2")} {...register('holders.0.address.addressLine2')} />
                    <DynamicFormField control={control} label="City" error={getFieldError("holders.0.address.city")} {...register('holders.0.address.city')} />
                    <DynamicFormField control={control} label="State" error={getFieldError("holders.0.address.state")} {...register('holders.0.address.state')} />
                    <DynamicFormField control={control} label="Pincode" error={getFieldError("holders.0.address.pincode")} {...register('holders.0.address.pincode')} />
                    <DynamicFormField control={control} label="Country" error={getFieldError("holders.0.address.country")} {...register('holders.0.address.country')} />

                    <h3 className="col-span-full font-semibold mt-4 mb-2">Guardian Information</h3>
                    <DynamicFormField control={control} label="Is Minor?" type="checkbox" error={getFieldError("holders.0.isMinor")} {...register('holders.0.isMinor')} />
                    
                    {watch('holders.0.isMinor') && (
                        <>
                            <DynamicFormField control={control} label="Guardian Full Name" error={getFieldError("holders.0.guardian.fullName")} {...register('holders.0.guardian.fullName')} />
                            <DynamicFormField control={control} label="Guardian ID Type" type="select" options={idTypeOptions} error={getFieldError("holders.0.guardian.idType")} {...register('holders.0.guardian.idType')} />
                            <DynamicFormField control={control} label="Guardian ID Number" error={getFieldError("holders.0.guardian.idNumber")} {...register('holders.0.guardian.idNumber')} />
                            <DynamicFormField control={control} label="Guardian Relationship" error={getFieldError("holders.0.guardian.relationship")} {...register('holders.0.guardian.relationship')} />
                        </>
                    )}
                </div>
            </div>
            
            {formErrors.holders?.message && (
                <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                    {formErrors.holders.message}
                </div>
            )}
            {holderFields.map((field, index) => (
                index > 0 && (
                    <div key={field.id} className="border p-4 my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                        <h4 className="col-span-full font-medium mb-2">Holder {index + 1}</h4>
                        <DynamicFormField control={control} label="PAN" error={getFieldError(`holders.${index}.pan`)} {...register(`holders.${index}.pan`)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleInvestorUniqueIdBlur(e, index)} />
                        <DynamicFormField control={control} label="Name" error={getFieldError(`holders.${index}.name`)} {...register(`holders.${index}.name`)} />
                        <DynamicFormField 
                            control={control} 
                            name={`holders.${index}.dob`} 
                            label="DOB" 
                            type="date-picker" 
                            setValue={setValue}
                            value={watch(`holders.${index}.dob`)}
                            error={getFieldError(`holders.${index}.dob`)}
                        />
                        <DynamicFormField control={control} label="Gender" type="select" options={genderOptions} error={getFieldError(`holders.${index}.gender`)} {...register(`holders.${index}.gender`)} />
                        <DynamicFormField control={control} label="Mobile" error={getFieldError(`holders.${index}.mobile`)} {...register(`holders.${index}.mobile`)} />
                        <DynamicFormField control={control} label="Email" error={getFieldError(`holders.${index}.email`)} {...register(`holders.${index}.email`)} />
                        
                        <DynamicFormField control={control} label="Address Line 1" error={getFieldError(`holders.${index}.address.addressLine1`)} {...register(`holders.${index}.address.addressLine1`)} />
                        <DynamicFormField control={control} label="Address Line 2" error={getFieldError(`holders.${index}.address.addressLine2`)} {...register(`holders.${index}.address.addressLine2`)} />
                        <DynamicFormField control={control} label="City" error={getFieldError(`holders.${index}.address.city`)} {...register(`holders.${index}.address.city`)} />
                        <DynamicFormField control={control} label="State" error={getFieldError(`holders.${index}.address.state`)} {...register(`holders.${index}.address.state`)} />
                        <DynamicFormField control={control} label="Pincode" error={getFieldError(`holders.${index}.address.pincode`)} {...register(`holders.${index}.address.pincode`)} />
                        <DynamicFormField control={control} label="Country" error={getFieldError(`holders.${index}.address.country`)} {...register(`holders.${index}.address.country`)} />

                        <h4 className="col-span-full font-medium mt-3 mb-2">Guardian Information</h4>
                        <DynamicFormField control={control} label="Is Minor?" type="checkbox" error={getFieldError(`holders.${index}.isMinor`)} {...register(`holders.${index}.isMinor`)} />
                        
                        {watch(`holders.${index}.isMinor`) && (
                            <>
                                <DynamicFormField control={control} label="Guardian Full Name" error={getFieldError(`holders.${index}.guardian.fullName`)} {...register(`holders.${index}.guardian.fullName`)} />
                                <DynamicFormField control={control} label="Guardian ID Type" type="select" options={idTypeOptions} error={getFieldError(`holders.${index}.guardian.idType`)} {...register(`holders.${index}.guardian.idType`)} />
                                <DynamicFormField control={control} label="Guardian ID Number" error={getFieldError(`holders.${index}.guardian.idNumber`)} {...register(`holders.${index}.guardian.idNumber`)} />
                                <DynamicFormField control={control} label="Guardian Relationship" error={getFieldError(`holders.${index}.guardian.relationship`)} {...register(`holders.${index}.guardian.relationship`)} />
                            </>
                        )}

                        {watchHoldingMode === 'JOINT' && holderFields.length < 3 && (
                            <Button type="button" onClick={() => removeHolder(index)} className="absolute top-2 right-2"><TrashBinIcon /></Button>
                        )}
                    </div>
                )
            ))}
            {watchHoldingMode === HoldingMode.JOINT && holderFields.length < 3 && (
                <Button type="button" onClick={() => appendHolder({ pan: '', name: '', dob: '', gender: genderOptions[0].value, email: '', mobile: '', address: { addressLine1: '', addressLine2: '', city: '', state: '', pincode: '', country: '' }, isMinor: false })} >Add Holder</Button>
            )}
        </div>
    );
};
