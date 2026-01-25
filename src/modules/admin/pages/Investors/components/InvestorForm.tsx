import React, { useEffect, useState } from 'react';
import { useForm } from '@shared/hooks/useForm';
import { InvestorSchema, InvestorSchemaType } from '../schema/investorSchema';
import { Investor } from '../types/investor';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import ComponentCard from '@shared/components/common/ComponentCard';
import { setFormErrors } from '@/shared/utils/formUtils';
import { formatDate } from '@/shared/utils/dateUtils';
import { Tabs } from '@shared/components/common/Tabs';
import { InvestorDocumentType } from '../types/document';
import { TrashBinIcon, PlusIcon, PencilIcon } from '@shared/icons';
import { BankModal } from './BankModal';



interface InvestorFormProps {
    investor?: Investor | null;
    onSubmit: (data: any) => Promise<any>;
    isLoading: boolean;
}

const emptyValues: InvestorSchemaType = {
    name: '',
    pan: '',
    myaltCode: '',
    dateOfBirth: '',
    gender: '',
    mobile: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    residentialStatus: '',
    subStatus: '',
    guardianName: '',
    guardianIdType: '',
    guardianIdNumber: '',
    isActive: true,
    banks: [],
    holders: [],
    nominees: [],
    pan_doc: undefined,
    aadhaar_doc: undefined,
    passport_doc: undefined,
    address_proof_doc: undefined,
    bank_proof_doc: undefined,
    other_doc: undefined,
};

export const InvestorForm: React.FC<InvestorFormProps> = ({ investor, onSubmit, isLoading }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [documentsToRemove, setDocumentsToRemove] = useState<string[]>([]);



    const {
        control,
        handleSubmit,
        reset,
        setError,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm(InvestorSchema);

    useEffect(() => {
        if (investor) {
            reset({
                ...investor,
                name: investor.name ?? '',
                pan: investor.pan ?? '',
                myaltCode: investor.myaltCode ?? '',
                dateOfBirth: investor.dateOfBirth ? formatDate(investor.dateOfBirth) : '',
                gender: investor.gender ?? '',
                mobile: investor.mobile ?? '',
                email: investor.email ?? '',
                address1: investor.address1 ?? '',
                address2: investor.address2 ?? '',
                city: investor.city ?? '',
                state: investor.state ?? '',
                country: investor.country ?? '',
                pincode: investor.pincode ?? '',
                residentialStatus: investor.residentialStatus ?? '',
                subStatus: investor.subStatus ?? '',
                guardianName: investor.guardianName ?? '',
                guardianIdType: investor.guardianIdType ?? '',
                guardianIdNumber: investor.guardianIdNumber ?? '',
                isActive: investor.isActive ?? true,
            });
        }
    }, [investor, reset]);

    useEffect(() => {
        console.log(errors, ' errors')
    }, [errors])

    const handleFormSubmit = async (data: InvestorSchemaType) => {
        console.log('data; ', data)
        try {
            await onSubmit({ ...data, documentsToRemove });
        } catch (error: any) {
            console.error('Submission error:', error);
            setFormErrors(error, setError);
        }
    };



    const tabFields: Record<string, (keyof InvestorSchemaType)[]> = {
        "General Info": ['name', 'pan', 'myaltCode', 'dateOfBirth', 'gender', 'mobile', 'email', 'address1', 'address2', 'city', 'state', 'country', 'pincode', 'residentialStatus', 'subStatus', 'guardianName', 'guardianIdType', 'guardianIdNumber', 'isActive'],
        "Documents": ['pan_doc', 'aadhaar_doc', 'passport_doc', 'address_proof_doc', 'bank_proof_doc', 'other_doc'],
    };

    const tabs = [
        {
            label: "General Info",
            hasError: tabFields["General Info"].some(field => !!errors[field]),
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DynamicFormField control={control} label="Name" error={errors.name} {...register('name')} />
                    <DynamicFormField control={control} label="PAN" error={errors.pan} {...register('pan')} />
                    <DynamicFormField control={control} label="MyALT Code" error={errors.myaltCode} {...register('myaltCode')} />
                    <DynamicFormField
                        control={control}
                        name="dateOfBirth"
                        label="Date of Birth"
                        type="date-picker"
                        error={errors.dateOfBirth}
                        setValue={setValue}
                        value={watch('dateOfBirth')}
                    />
                    <DynamicFormField control={control} label="Gender" error={errors.gender} {...register('gender')} />
                    <DynamicFormField control={control} label="Mobile" error={errors.mobile} {...register('mobile')} />
                    <DynamicFormField control={control} label="Email" type="email" error={errors.email} {...register('email')} />
                    <DynamicFormField control={control} label="Address 1" error={errors.address1} {...register('address1')} />
                    <DynamicFormField control={control} label="Address 2" error={errors.address2} {...register('address2')} />
                    <DynamicFormField control={control} label="City" error={errors.city} {...register('city')} />
                    <DynamicFormField control={control} label="State" error={errors.state} {...register('state')} />
                    <DynamicFormField control={control} label="Country" error={errors.country} {...register('country')} />
                    <DynamicFormField control={control} label="Pincode" error={errors.pincode} {...register('pincode')} />
                    <DynamicFormField control={control} label="Residential Status" error={errors.residentialStatus} {...register('residentialStatus')} />
                    <DynamicFormField control={control} label="Sub Status" error={errors.subStatus} {...register('subStatus')} />
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Guardian Details (if minor)</h3>
                    </div>
                    <DynamicFormField control={control} label="Guardian Name" error={errors.guardianName} {...register('guardianName')} />
                    <DynamicFormField control={control} label="Guardian ID Type" error={errors.guardianIdType} {...register('guardianIdType')} />
                    <DynamicFormField control={control} label="Guardian ID Number" error={errors.guardianIdNumber} {...register('guardianIdNumber')} />
                    <DynamicFormField control={control} name="isActive" label="Is Active" type="checkbox" error={errors.isActive} />
                </div>
            )
        },
        {
            label: "Documents",
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.values(InvestorDocumentType).map((docType) => {
                        const document = investor?.documents.find(d => d.documentType === docType);
                        return (
                            <DynamicFormField
                                key={docType}
                                control={control}
                                label={`Upload ${docType.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}`}
                                name={`${docType}_doc`}
                                type="file"
                                imageUrl={document?.fileUrl}
                                onRemove={() => setDocumentsToRemove((prev) => [...prev, document!.id])}
                            />
                        )
                    })}
                </div>
            )
        }
    ];

    return (
        <ComponentCard>
            <Form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <Tabs 
                    tabs={tabs} 
                    activeTab={activeTab} 
                    onChange={setActiveTab}
                />
                <div className="flex justify-end mt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </Form>
        </ComponentCard>
    );
};
