import React, { useEffect, useState, useRef } from 'react';
import { useFieldArray } from 'react-hook-form';
import { InvestmentSchema, InvestmentSchemaType } from '../schema/investmentSchema';
import { Investment } from '../types/investment';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import ComponentCard from '@shared/components/common/ComponentCard';
import { setFormErrors } from '@/shared/utils/formUtils';
import { Tabs } from '@shared/components/common/Tabs';
import { useGetInvestorsQuery } from '../../Investors/api/investorApi';
import { useGetAmcsQuery } from '../../Amcs/api/amcApi';
import { useGetProductListQuery, useGetSchemesQuery } from '../../Schemes/api/schemeApi';
import { PlusIcon, TrashBinIcon } from '@shared/icons';
import { useGetUsersQuery } from '../../Users/api/userApi';
import { useGetDistributorsQuery } from '../../Distributors/api/distributorApi';
import { useGetBanksQuery } from '../../Investors/api/bankApi';
import { useGetHoldersQuery, useGetHolderByIdQuery } from '../../Investors/api/holderApi';
import { useGetNomineesQuery, useGetNomineeByIdQuery } from '../../Investors/api/nomineeApi';
import InvestmentHolderTable from './InvestmentHolderTable';
import InvestmentHolderModal from './InvestmentHolderModal';
import InvestmentNomineeTable from './InvestmentNomineeTable';
import InvestmentNomineeModal from './InvestmentNomineeModal';
import { useForm } from '@/shared/hooks/useForm';

interface InvestmentFormProps {
    investment?: Investment | null;
    onSubmit: (data: InvestmentSchemaType) => Promise<any>;
    isLoading: boolean;
}

const emptyValues: InvestmentSchemaType = {
    investorId: '',
    productId: '',
    capitalCommitment: undefined,
    amcId: '',
    amcCode: '',
    amcClientCode: '',
    inceptionDate: '',
    modeOfHolding: '',
    amcSharing: undefined,
    schemeId: '',
    schemeCode: '',
    cpId: '',
    cpCode: '',
    creId: '',
    creCode: '',
    rmId: '',
    rmCode: '',
    fmCode: '',
    branchCode: '',
    holders: [],
    dpType: '',
    dpName: '',
    dpId: '',
    clientId: '',
    bankId: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    nominees: [],
};

export const InvestmentForm: React.FC<InvestmentFormProps> = ({ investment, onSubmit, isLoading }) => {
    const [activeTab, setActiveTab] = useState(0);

    const {
        control,
        handleSubmit,
        reset,
        setError,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm(InvestmentSchema,{
        defaultValues: emptyValues
    });

    const { fields: holderFields, append: appendHolder, remove: removeHolder, update: updateHolder } = useFieldArray({
        control,
        name: "holders"
    });

    const { fields: nomineeFields, append: appendNominee, remove: removeNominee, update: updateNominee } = useFieldArray({
        control,
        name: "nominees"
    });

    useEffect(() => {
        console.log('InvestmentForm errors:', errors);
    }, [errors]);

    // For prefill logic
    const [holderPrefillIndex, setHolderPrefillIndex] = useState<number | null>(null);
    const [nomineePrefillIndex, setNomineePrefillIndex] = useState<number | null>(null);

    const watchInvestorId = watch('investorId');
    const { data: investorsData } = useGetInvestorsQuery({ limit: 1000 });
    const { data: amcsData } = useGetAmcsQuery({ limit: 1000 });
    const { data: productsData } = useGetProductListQuery();
    const { data: schemesData } = useGetSchemesQuery({ limit: 1000 });
    const { data: usersData } = useGetUsersQuery({ limit: 1000 });
    const { data: distributorsData } = useGetDistributorsQuery({ limit: 1000 });

    const { data: investorBanksData } = useGetBanksQuery({ investorId: watchInvestorId }, { skip: !watchInvestorId });
    const { data: investorHoldersData } = useGetHoldersQuery({ investorId: watchInvestorId }, { skip: !watchInvestorId });
    const { data: investorNomineesData } = useGetNomineesQuery({ investorId: watchInvestorId }, { skip: !watchInvestorId });

    const investorOptions = investorsData?.data.map((inv: any) => ({ label: inv.name, value: inv.id })) || [];
    const amcOptions = amcsData?.data.map((amc: any) => ({ label: amc.name, value: amc.id, code: amc.amcCode })) || [];
    const productOptions = productsData?.data.map((prod: any) => ({ label: prod.name, value: prod.id })) || [];
    const schemeOptions = schemesData?.data.map((scheme: any) => ({ label: scheme.schemeName, value: scheme.id, code: scheme.schemeCode })) || [];
    const userOptions = usersData?.data.map((user: any) => ({ label: user.firstName + " " + user.lastName, value: user.id, code: user.employeeId })) || [];
    const distributorOptions = distributorsData?.data.map((dist: any) => ({ label: dist.name, value: dist.id, code: dist.distributorCode })) || [];
    const bankOptions = investorBanksData?.data.map((bank: any) => ({ label: bank.bankName, value: bank.id })) || [];
    const holderOptions = investorHoldersData?.data.map((holder: any) => ({ label: holder.name, value: holder.id })) || [];
    const nomineeOptions = investorNomineesData?.data.map((nominee: any) => ({ label: nominee.name, value: nominee.id })) || [];

    const watchAmcId = watch('amcId');
    const watchSchemeId = watch('schemeId');
    const watchCpId = watch('cpId');
    const watchBankId = watch('bankId');

    // Track previous investorId to detect changes
    const prevInvestorId = useRef<string | undefined>(undefined);

    // Add investor as first holder when investor is selected
    useEffect(() => {
        if (
            watchInvestorId &&
            investorsData?.data?.length
        ) {
            const investor = investorsData.data.find((inv: any) => inv.id === watchInvestorId);
            if (investor) {
                // Prepare holder object (match HolderSchema fields)
                const holder = {
                    investorId: watchInvestorId,
                    holderPosition: 1,
                    name: investor.name,
                    pan: investor.pan ?? '',
                    dateOfBirth: investor.dateOfBirth ?? '',
                    gender: investor.gender ?? '',
                    mobile: investor.mobile ?? '',
                    email: investor.email ?? '',
                    address1: investor.address1 ?? '',
                    address2: investor.address2 ?? '',
                    city: investor.city ?? '',
                    state: investor.state ?? '',
                    country: investor.country ?? '',
                    pincode: investor.pincode ?? '',
                    isActive: true,
                };
                // Always update first holder to match investor
                if (holderFields.length) {
                    updateHolder(0, holder);
                } else {
                    appendHolder(holder);
                }
            }
            prevInvestorId.current = watchInvestorId;
        }
    }, [watchInvestorId, investorsData, appendHolder, updateHolder]);

    useEffect(() => {
        if (watchAmcId) {
            const selectedAmc = amcOptions.find(amc => amc.value === watchAmcId);
            if (selectedAmc) {
                setValue('amcCode', selectedAmc.code);
            }
        }
    }, [watchAmcId, amcOptions, setValue]);

    useEffect(() => {
        if (watchSchemeId) {
            const selectedScheme = schemeOptions.find((scheme: any) => scheme.value === watchSchemeId);
            if (selectedScheme) {
                setValue('schemeCode', selectedScheme.code);
            }
        }
    }, [watchSchemeId, schemeOptions, setValue]);

    useEffect(() => {
        if (watchCpId) {
            const selectedCp = distributorOptions.find(cp => cp.value === watchCpId);
            if (selectedCp) {
                setValue('cpCode', selectedCp.code);
            }
        }
    }, [watchCpId, distributorOptions, setValue]);

    useEffect(() => {
        if (watchBankId && investorBanksData) {
            const selectedBank = investorBanksData.data.find((bank: any) => bank.id === watchBankId);
            if (selectedBank) {
                setValue('bankName', selectedBank.bankName);
                setValue('accountNumber', selectedBank.accountNumber);
                setValue('ifscCode', selectedBank.ifscCode);
                setValue('accountType', selectedBank.accountType);
            }
        }
    }, [watchBankId, investorBanksData, setValue]);

    useEffect(() => {
        if (investment) {
            reset(investment);
        }
    }, [investment, reset]);

    const handleFormSubmit = async (data: InvestmentSchemaType) => {
        try {
            await onSubmit(data);
        } catch (error: any) {
            console.error('Submission error:', error);
            setFormErrors(error, setError);
        }
    };

    // Holder modal state
    const [showHolderModal, setShowHolderModal] = useState(false);
    const [editingHolderIndex, setEditingHolderIndex] = useState<number | null>(null);
    // Nominee modal state
    const [showNomineeModal, setShowNomineeModal] = useState(false);
    const [editingNomineeIndex, setEditingNomineeIndex] = useState<number | null>(null);

    // Handler for add/edit holder
    const handleAddHolder = () => {
        if (holderFields.length >= 3) return;
        setEditingHolderIndex(null);
        setShowHolderModal(true);
    };
    const handleEditHolder = (holder: any) => {
        const index = holderFields.findIndex((h) => h.id === holder.id);
        if (index !== -1) {
            setEditingHolderIndex(index);
            setShowHolderModal(true);
        }
    };
    const handleDeleteHolder = (holder: any) => {
        const index = holderFields.findIndex((h) => h.id === holder.id);
        if (index !== -1) removeHolder(index);
    };
    const handleHolderModalSubmit = (data: any) => {
        if (editingHolderIndex !== null) {
            updateHolder(editingHolderIndex, {
                ...data,
                holderPosition: editingHolderIndex + 1,
            });
        } else {
            if (holderFields.length < 3) {
                appendHolder({
                    ...data,
                    holderPosition: holderFields.length + 1,
                });
            }
        }
        setShowHolderModal(false);
    };

    // Handler for add/edit nominee
    const handleAddNominee = () => {
        if (nomineeFields.length >= 3) return;
        setEditingNomineeIndex(null);
        setShowNomineeModal(true);
    };
    const handleEditNominee = (nominee: any) => {
        const index = nomineeFields.findIndex((n) => n.id === nominee.id);
        if (index !== -1) {
            setEditingNomineeIndex(index);
            setShowNomineeModal(true);
        }
    };
    const handleDeleteNominee = (nominee: any) => {
        const index = nomineeFields.findIndex((n) => n.id === nominee.id);
        if (index !== -1) removeNominee(index);
    };
    const handleNomineeModalSubmit = (data: any) => {
        if (editingNomineeIndex !== null) {
            updateNominee(editingNomineeIndex, data);
        } else {
            if (nomineeFields.length < 3) {
                appendNominee(data);
            }
        }
        setShowNomineeModal(false);
    };

    const tabs = [
        {
            label: "Product & Investment",
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DynamicFormField control={control} label="Investor" type="select" options={investorOptions} error={errors.investorId} {...register('investorId')} />
                    <DynamicFormField control={control} label="Product" type="select" options={productOptions} error={errors.productId} {...register('productId')} />
                    {watch('productId') === 'AIF' && <DynamicFormField control={control} label="Capital Commitment (INR)" type="number" error={errors.capitalCommitment} {...register('capitalCommitment')} />}
                    {watch('productId') === 'GIFT AIF' && <DynamicFormField control={control} label="Capital Commitment (USD)" type="number" error={errors.capitalCommitment} {...register('capitalCommitment')} />}
                    <DynamicFormField control={control} label="AMC Name" type="select" options={amcOptions} error={errors.amcId} {...register('amcId')} />
                    <DynamicFormField control={control} label="AMC Code" error={errors.amcCode} {...register('amcCode')} isReadOnly />
                    <DynamicFormField control={control} label="AMC Client Code" error={errors.amcClientCode} {...register('amcClientCode')} />
                    <DynamicFormField control={control} name="inceptionDate" label="Inception Date" type="date-picker" error={errors.inceptionDate} setValue={setValue} value={watch('inceptionDate')} />
                    <DynamicFormField control={control} label="Mode of Holdings" error={errors.modeOfHolding} {...register('modeOfHolding')} />
                    <DynamicFormField control={control} label="AMC Sharing" type="number" error={errors.amcSharing} {...register('amcSharing')} />
                </div>
            )
        },
        {
            label: "Scheme & Internal Mapping",
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DynamicFormField control={control} label="Scheme Name" type="select" options={schemeOptions} error={errors.schemeId} {...register('schemeId')} />
                    <DynamicFormField control={control} label="Scheme Code" error={errors.schemeCode} {...register('schemeCode')} isReadOnly />
                    <DynamicFormField control={control} label="CP Name" type="select" options={distributorOptions} error={errors.cpId} {...register('cpId')} />
                    <DynamicFormField control={control} label="CP Code" error={errors.cpCode} {...register('cpCode')} isReadOnly />
                    <DynamicFormField control={control} label="CRE Name" type="select" options={userOptions} error={errors.creId} {...register('creId')} />
                    <DynamicFormField control={control} label="CRE Code" error={errors.creCode} {...register('creCode')} isReadOnly />
                    <DynamicFormField control={control} label="RM Name" type="select" options={userOptions} error={errors.rmId} {...register('rmId')} />
                    <DynamicFormField control={control} label="RM Code" error={errors.rmCode} {...register('rmCode')} isReadOnly />
                    <DynamicFormField control={control} label="FM Code" error={errors.fmCode} {...register('fmCode')} />
                    <DynamicFormField control={control} label="Branch Code" error={errors.branchCode} {...register('branchCode')} />
                </div>
            )
        },
        {
            label: "Bank & DP",
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DynamicFormField control={control} label="DP Type" type="select" options={[{ label: 'NSDL', value: 'NSDL' }, { label: 'CDSL', value: 'CDSL' }]} error={errors.dpType} {...register('dpType')} />
                    <DynamicFormField control={control} label="DP Name" error={errors.dpName} {...register('dpName')} />
                    <DynamicFormField control={control} label="DP ID" error={errors.dpId} {...register('dpId')} />
                    <DynamicFormField control={control} label="Client ID" error={errors.clientId} {...register('clientId')} />
                    <DynamicFormField control={control} label="Bank" type="select" options={bankOptions} error={errors.bankId} {...register('bankId')} />
                    <DynamicFormField control={control} label="Bank Name" error={errors.bankName} {...register('bankName')} />
                    <DynamicFormField control={control} label="Account Number" error={errors.accountNumber} {...register('accountNumber')} />
                    <DynamicFormField control={control} label="IFSC Code" error={errors.ifscCode} {...register('ifscCode')} />
                    <DynamicFormField control={control} label="Account Type" error={errors.accountType} {...register('accountType')} />
                </div>
            )
        },
        {
            label: "Holder Details",
            content: (
                <div>
                    <Button type="button" onClick={handleAddHolder} disabled={holderFields.length >= 3}>
                        <PlusIcon /> Add Holder
                    </Button>
                    <div className="mb-4">
                        <InvestmentHolderTable
                            holders={holderFields as any}
                            onEdit={handleEditHolder}
                            onDelete={handleDeleteHolder}
                            disableEditDeleteFirst
                        />
                    </div>
                </div>
            )
        },
        {
            label: "Nominee",
            content: (
                <div>
                    <div className="mb-4">
                        <InvestmentNomineeTable
                            nominees={nomineeFields as any}
                            onEdit={handleEditNominee}
                            onDelete={handleDeleteNominee}
                        />
                    </div>
                    <Button type="button" onClick={handleAddNominee} disabled={nomineeFields.length >= 3}>
                        <PlusIcon /> Add Nominee
                    </Button>
                </div>
            )
        },
    ];

    return (
        <ComponentCard>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                <div className="flex justify-end mt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </Form>
            {/* Modals OUTSIDE the Form */}
            <div className="max-w-lg mx-auto">
                <InvestmentHolderModal
                    isOpen={showHolderModal}
                    onClose={() => setShowHolderModal(false)}
                    initialData={editingHolderIndex !== null ? (holderFields[editingHolderIndex] as any) : undefined}
                    onSubmit={handleHolderModalSubmit}
                />
            </div>
            <div className="max-w-lg mx-auto">
                <InvestmentNomineeModal
                    isOpen={showNomineeModal}
                    onClose={() => setShowNomineeModal(false)}
                    initialData={editingNomineeIndex !== null ? (nomineeFields[editingNomineeIndex] as any) : undefined}
                    onSubmit={handleNomineeModalSubmit}
                />
            </div>
        </ComponentCard>
    );
};
