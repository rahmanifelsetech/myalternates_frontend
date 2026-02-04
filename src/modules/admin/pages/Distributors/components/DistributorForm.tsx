import React, { useEffect, useState } from 'react';
import { useForm } from '@/shared/hooks/useForm';
import { DistributorSchema, DistributorSchemaType } from '../schema/distributorSchema';
import { Distributor } from '../types/distributor';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import ComponentCard from '@shared/components/common/ComponentCard';
import { Tabs } from '@shared/components/common/Tabs';
import { setFormErrors } from '@shared/utils/formUtils';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { PlusIcon, TrashBinIcon } from '@shared/icons';
import { useGetUsersQuery } from '../../Users/api/userApi';
import { useGetDistributorListQuery } from '@/shared/services/api/masterDataApi';

interface DistributorFormProps {
    distributor?: Distributor | null;
    onSubmit: (data: DistributorSchemaType) => Promise<any>;
    onCancel: () => void;
    isLoading: boolean;
}

const emptyValues: DistributorSchemaType = {
    name: '',
    code: '',
    type: '',
    category: '',
    parentDistributorId: null,
    relationshipManagerId: '',
    isActive: true,
    email: '',
    contactNo: '',
    panNo: '',
    tanNo: null,
    gstType: null,
    gstNo: null,
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    totalAum: null,
    commission: null,
    dateOfAgreement: null,
    bankName: '',
    bankAccountName: '',
    bankAccountNo: '',
    ifscCode: '',
    micrCode: null,
    apmiRegNo: null,
    apmiEuinNo: null,
    nismCertNo: null,
    amfiRegNo: null,
    amfiEuinNo: null,
    kyc_doc: undefined,
    pan_doc: undefined,
    address_proof_doc: undefined,
    bank_proof_doc: undefined,
    other_doc: undefined,
    documentsToRemove: [],
};

const DISTRIBUTOR_TYPES = [
    { label: 'Distributor', value: 'Distributor' },
    { label: 'Sub-Distributor', value: 'Sub-Distributor' },
];

const DISTRIBUTOR_CATEGORIES = [
    { label: 'Silver', value: 'Silver' },
    { label: 'Gold', value: 'Gold' },
    { label: 'Platinum', value: 'Platinum' },
];

const GST_TYPES = [
    { label: 'Registered', value: 'Registered' },
    { label: 'Unregistered', value: 'Unregistered' },
    { label: 'Composition', value: 'Composition' },
];

export const DistributorForm: React.FC<DistributorFormProps> = ({ distributor, onSubmit, onCancel, isLoading }) => {
    const [filesToRemove, setFilesToRemove] = useState<string[]>([]);
    const [documentUrls, setDocumentUrls] = useState<Record<string, string>>({});
    const [documentIds, setDocumentIds] = useState<Record<string, string>>({});

    const { data: distributorList, isLoading: isDistributorsLoading } =  useGetDistributorListQuery();
    const distributorOptions = distributorList?.data?.map((dist: any) => ({ label: dist.name + ' - ' + dist.code, value: dist.id })) || [];

    const initialValues = React.useMemo(() => {
        if (distributor) {
            const primaryAddress = distributor.person.addresses?.[0];
            const primaryBank = distributor.banks?.[0];
            const kycDocMap = (distributor.person.kycDocuments || []).reduce((acc: Record<string, any>, doc: any) => {
                acc[doc.documentType] = doc.fileUrl;
                return acc;
            }, {});
            const docIdMap = (distributor.person.kycDocuments || []).reduce((acc: Record<string, any>, doc: any) => {
                acc[doc.documentType] = doc.id;
                return acc;
            }, {});

            // Store document URLs and IDs separately
            setDocumentUrls(kycDocMap);
            setDocumentIds(docIdMap);

            return {
                name: distributor.person.fullName ?? '',
                code: distributor.code ?? '',
                type: distributor.type ?? '',
                category: distributor.category ?? '',
                parentDistributorId: distributor.parentDistributorId ?? null,
                relationshipManagerId: distributor.relationshipManagerId ?? '',
                isActive: distributor.isActive ?? true,
                email: distributor.person.email ?? '',
                contactNo: distributor.person.mobile ?? '',
                panNo: distributor.person.pan ?? '',
                tanNo: distributor.tanNo ?? null,
                gstType: distributor.gstType ?? null,
                gstNo: distributor.gstNo ?? null,
                address: primaryAddress?.address1 ?? '',
                city: primaryAddress?.city ?? '',
                state: primaryAddress?.state ?? '',
                country: primaryAddress?.country ?? '',
                pincode: primaryAddress?.pincode ?? '',
                totalAum: distributor.totalAum ? Number(distributor.totalAum) : null,
                commission: distributor.commission ? Number(distributor.commission) : null,
                dateOfAgreement: distributor.agreementDate ?? null,
                bankName: primaryBank?.bankName ?? '',
                bankAccountName: primaryBank?.accountName ?? '',
                bankAccountNo: primaryBank?.accountNumber ?? '',
                ifscCode: primaryBank?.ifsc ?? '',
                micrCode: primaryBank?.micr ?? null,
                apmiRegNo: distributor.apmiRegNo ?? null,
                apmiEuinNo: distributor.apmiEuinNo ?? null,
                nismCertNo: distributor.nismCertNo ?? null,
                amfiRegNo: distributor.amfiRegNo ?? null,
                amfiEuinNo: distributor.amfiEuinNo ?? null,
                kyc_doc: kycDocMap.kyc_doc,
                pan_doc: kycDocMap.pan_doc,
                address_proof_doc: kycDocMap.address_proof_doc,
                bank_proof_doc: kycDocMap.bank_proof_doc,
                other_doc: kycDocMap.other_doc,
                documentsToRemove: [],
            } as DistributorSchemaType;
        }
        return { ...emptyValues };
    }, [distributor]);

    const {
        control,
        handleSubmit,
        reset,
        setError,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm(DistributorSchema, initialValues);

    const { data: userList } = useGetUsersQuery({ limit: 1000, slug: 'rm' });
    const rmOptions = userList?.data?.map((u: any) => ({ label: `${u.firstName} ${u.lastName} - ${u.userCode}`, value: u.id })) || [];

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        reset(initialValues);
        setFilesToRemove([]);
    }, [initialValues, reset]);

    const handleFormSubmit = async (data: DistributorSchemaType) => {
        try {
            const payload = {
                ...data,
                documentsToRemove: filesToRemove,
            };
            
            await onSubmit(payload as any);
        } catch (error: any) {
            console.error('Submission form API error:', error);
            setFormErrors(error, setError);
        }
    };

    const tabFields: Record<string, (keyof DistributorSchemaType)[]> = {
        "Basic Details": ['name', 'code', 'type', 'category', 'relationshipManagerId', 'parentDistributorId', 'email', 'contactNo', 'isActive'],
        "Tax Details": ['panNo', 'tanNo', 'gstType', 'gstNo'],
        "Address": ['address', 'city', 'state', 'country', 'pincode'],
        "Bank Details": ['bankName', 'bankAccountName', 'bankAccountNo', 'ifscCode', 'micrCode'],
        "Registration": ['apmiRegNo', 'apmiEuinNo', 'nismCertNo', 'amfiRegNo', 'amfiEuinNo'],
        "Documents": ['kyc_doc', 'pan_doc', 'address_proof_doc', 'bank_proof_doc', 'other_doc'],
    };

    const tabs = [
        {
            label: "Basic Details",
            hasError: tabFields["Basic Details"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4`}>Basic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Name" required error={errors.name} {...register('name')} />
                        <DynamicFormField control={control} label="Distributor Code" required error={errors.code} {...register('code')} />
                        <DynamicFormField control={control} label="Type" type="select" options={DISTRIBUTOR_TYPES} required error={errors.type} {...register('type')} />
                        <DynamicFormField control={control} label="Category" type="select" options={DISTRIBUTOR_CATEGORIES} required error={errors.category} {...register('category')} />
                        {
                            watch('type') === 'Sub-Distributor' && (
                                <DynamicFormField type='select' control={control} label="Parent Distributor" options={distributorOptions} required error={errors.parentDistributorId} {...register('parentDistributorId')} />
                            )
                        }
                        <DynamicFormField control={control} label="Relationship Manager" type="select" options={rmOptions} required error={errors.relationshipManagerId} {...register('relationshipManagerId')} />
                        <DynamicFormField control={control} label="Is Active?" type="checkbox" error={errors.isActive} {...register('isActive')} />
                    </div>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Email" type="email" required error={errors.email} {...register('email')} />
                        <DynamicFormField control={control} label="Contact No" type="phone" required error={errors.contactNo} {...register('contactNo')} />
                    </div>
                </div>
            )
        },
        {
            label: "Tax Details",
            hasError: tabFields["Tax Details"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4`}>Tax Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="PAN No" required error={errors.panNo} {...register('panNo')} />
                        <DynamicFormField control={control} label="TAN No" error={errors.tanNo} {...register('tanNo')} />
                        <DynamicFormField control={control} label="GST Type" type="select" options={GST_TYPES} error={errors.gstType} {...register('gstType')} />
                        <DynamicFormField control={control} label="GST No" error={errors.gstNo} {...register('gstNo')} />
                    </div>
                </div>
            )
        },
        {
            label: "Address",
            hasError: tabFields["Address"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4`}>Address Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Address" type="textarea" required error={errors.address} {...register('address')} />
                        <DynamicFormField control={control} label="City" required error={errors.city} {...register('city')} />
                        <DynamicFormField control={control} label="State" required error={errors.state} {...register('state')} />
                        <DynamicFormField control={control} label="Country" required error={errors.country} {...register('country')} />
                        <DynamicFormField control={control} label="Pincode" required error={errors.pincode} {...register('pincode')} />
                    </div>
                </div>
            )
        },
        {
            label: "Bank Details",
            hasError: tabFields["Bank Details"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4`}>Bank Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Bank Name" required error={errors.bankName} {...register('bankName')} />
                        <DynamicFormField control={control} label="Account Name" required error={errors.bankAccountName} {...register('bankAccountName')} />
                        <DynamicFormField control={control} label="Account No" required error={errors.bankAccountNo} {...register('bankAccountNo')} />
                        <DynamicFormField control={control} label="IFSC Code" required error={errors.ifscCode} {...register('ifscCode')} />
                        <DynamicFormField control={control} label="MICR Code" error={errors.micrCode} {...register('micrCode')} />
                    </div>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Financials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Total AUM" type="number" error={errors.totalAum} {...register('totalAum')} />
                        <DynamicFormField control={control} label="Commission" type="number" error={errors.commission} {...register('commission')} />
                        <DynamicFormField 
                            control={control} 
                            label="Date of Agreement" 
                            type="date-picker" 
                            setValue={setValue} 
                            value={watch('dateOfAgreement')}
                            error={errors.dateOfAgreement} 
                            name="dateOfAgreement" 
                        />
                    </div>
                </div>
            )
        },
        {
            label: "Registration",
            hasError: tabFields["Registration"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4`}>Registration Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="APMI Reg No" error={errors.apmiRegNo} {...register('apmiRegNo')} />
                        <DynamicFormField control={control} label="APMI EUIN No" error={errors.apmiEuinNo} {...register('apmiEuinNo')} />
                        <DynamicFormField control={control} label="NISM Cert No" error={errors.nismCertNo} {...register('nismCertNo')} />
                        <DynamicFormField control={control} label="AMFI Reg No" error={errors.amfiRegNo} {...register('amfiRegNo')} />
                        <DynamicFormField control={control} label="AMFI EUIN No" error={errors.amfiEuinNo} {...register('amfiEuinNo')} />
                    </div>
                </div>
            )
        },
        {
            label: "Documents",
            hasError: tabFields["Documents"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4`}>Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField 
                            control={control} 
                            name="kyc_doc" 
                            label="KYC Document" 
                            type="file" 
                            error={errors.kyc_doc}
                            imageUrl={documentUrls['kyc_doc']}
                            onRemove={() => documentIds['kyc_doc'] && setFilesToRemove(prev => [...prev, documentIds['kyc_doc']])}
                        />
                        <DynamicFormField 
                            control={control} 
                            name="pan_doc" 
                            label="PAN Document" 
                            type="file" 
                            error={errors.pan_doc}
                            imageUrl={documentUrls['pan_doc']}
                            onRemove={() => documentIds['pan_doc'] && setFilesToRemove(prev => [...prev, documentIds['pan_doc']])}
                        />
                        <DynamicFormField 
                            control={control} 
                            name="address_proof_doc" 
                            label="Address Proof" 
                            type="file" 
                            error={errors.address_proof_doc}
                            imageUrl={documentUrls['address_proof_doc']}
                            onRemove={() => documentIds['address_proof_doc'] && setFilesToRemove(prev => [...prev, documentIds['address_proof_doc']])}
                        />
                        <DynamicFormField 
                            control={control} 
                            name="bank_proof_doc" 
                            label="Bank Proof" 
                            type="file" 
                            error={errors.bank_proof_doc}
                            imageUrl={documentUrls['bank_proof_doc']}
                            onRemove={() => documentIds['bank_proof_doc'] && setFilesToRemove(prev => [...prev, documentIds['bank_proof_doc']])}
                        />
                        <DynamicFormField 
                            control={control} 
                            name="other_doc" 
                            label="Other Document" 
                            type="file" 
                            error={errors.other_doc}
                            imageUrl={documentUrls['other_doc']}
                            onRemove={() => documentIds['other_doc'] && setFilesToRemove(prev => [...prev, documentIds['other_doc']])}
                        />
                    </div>
                </div>
            )
        }
    ];

    return (
        <ComponentCard>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                <div className="flex justify-end gap-4 mt-8">
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </Form>
        </ComponentCard>
    );
};
