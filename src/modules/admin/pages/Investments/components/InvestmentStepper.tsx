import React, { useState, useEffect } from 'react';
import { useFieldArray, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { InvestmentFlowSchema, InvestmentFlowSchemaType } from '../schema/investmentFlowSchema';
import { Tabs } from '@/shared/components/common/Tabs';
import Button from '@/shared/components/ui/button/Button';
import Form from '@/shared/components/form/Form';
import { useHolderAutofill } from '../hooks/useHolderAutofill';
import { useInvestments } from '../hooks/useInvestments';
import { KycUploadModal } from './KycUploadModal';
import { useForm } from '@/shared/hooks/useForm';
import { useGetAmcListQuery, useGetProductListQuery, useGetSchemeListQuery, useGetFundManagerListQuery } from '@/shared/services/api/masterDataApi';
import { useGetDistributorsQuery } from '../../Distributors/api/distributorApi';
import { useGetUsersQuery } from '../../Users/api/userApi';
import { useGetBanksQuery } from '../../Investors/api/bankApi';
import { setFormErrors } from '@/shared/utils/formUtils';
import { useBlocker, useNavigate } from 'react-router';
import { ConfirmationModal } from '@/shared/components/common/ConfirmationModal';
import {
  HoldingMode,
  ResidentialStatus,
  DPType,
  IdType,
  Relationship,
  Gender,
} from '../types/investmentEnums';

import { InvestmentDetailsStep } from './steps/InvestmentDetailsStep';
import { HoldersStep } from './steps/HoldersStep';
import { InternalMappingStep } from './steps/InternalMappingStep';
import { DpAndBankStep } from './steps/DpAndBankStep';
import { NomineesStep } from './steps/NomineesStep';
import { KycStep } from './steps/KycStep';
import { DrawdownsStep } from './steps/DrawdownsStep';
import { AccountType } from '../../Investors/types/bank';

export const InvestmentStepper = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [showKycModal, setShowKycModal] = useState(false);
    const [selectedHolderForKyc, setSelectedHolderForKyc] = useState<number>(0);
    // State to store uploaded documents: keyed by holderIndex -> docType -> document details
    const [uploadedDocs, setUploadedDocs] = useState<Record<number, Record<string, any>>>({});

    // const defaultValues: Partial<InvestmentFlowSchemaType> = {
    //     // Investment Details
    //     productId: '',
    //     amcId: '',
    //     amcClientCode: 'TEST-002',
    //     schemeId: '',
    //     capitalCommitment: '100000',
    //     currency: 'INR',
    //     feeStructure: '4% management fee',
    //     inceptionDate: '2025-01-01',
    //     remarks: 'Test investment 2 for onboarding',

    //     // Investor Status
    //     investorMyaltCode: 'MYALT-001',
    //     investorResidentialStatus: ResidentialStatus.RESIDENT,
    //     investorSubStatus: '',

    //     // Internal Mapping
    //     cpId: undefined,
    //     creId: '',
    //     rmId: undefined,
    //     fmId: undefined,
    //     branchCode: 'BR-001',

    //     // DP & Bank
    //     dpType: DPType.NSDL,
    //     dpName: 'Test DP',
    //     dpId: 'DP-001',
    //     clientId: 'CLIENT-001',
    //     bankId: null,
    //     bankName: 'HDFC Bank',
    //     accountNumber: '1234567890',
    //     ifsc: 'HDFC0000123',
    //     accountType: AccountType.SAVINGS,

    //     // Holding Mode
    //     holdingMode: HoldingMode.JOINT,

    //     // Primary Holder
    //     holders: [{
    //         pan: 'ABCDE1234F',
    //         name: 'Rohan Sharma',
    //         dob: '1990-07-15',
    //         gender: Gender.MALE,
    //         email: 'rohan2@example.com',
    //         mobile: '987654342',
    //         address: {
    //             addressLine1: '123 Test Street',
    //             addressLine2: 'Apt 4B',
    //             city: 'Mumbai',
    //             state: 'Maharashtra',
    //             pincode: '400001',
    //             country: 'India',
    //         },
    //         isMinor: false,
    //     },
    //     {
    //         pan: 'XYZAB5678G',
    //         name: 'Anjali',
    //         dob: '1992-08-20',
    //         gender: Gender.FEMALE,
    //         email: 'anjali@example.com',
    //         mobile: '9876543211',
    //         address: {
    //             addressLine1: '456 Joint Street',
    //             addressLine2: 'Suite 5C',
    //             city: 'Mumbai',
    //             state: 'Maharashtra',
    //             pincode: '400002',
    //             country: 'India',
    //         },
    //         isMinor: true,
    //         guardian: {
    //             fullName: 'Rajesh Kumar',
    //             idType: IdType.PAN,
    //             idNumber: 'RAJESH123H',
    //             relationship: Relationship.CHILD,
    //         },
    //     }],

    //     // Nominees
    //     nominees: [{
    //         name: 'Priya Sharma',
    //         idType: IdType.AADHAAR,
    //         idNumber: '123456789012',
    //         relationship: Relationship.SPOUSE,
    //         percentage: 50,
    //         isMinor: false,
    //     },
    //     {
    //         name: 'Arjun Sharma',
    //         idType: IdType.PASSPORT,
    //         idNumber: 'P123456789',
    //         relationship: Relationship.CHILD,
    //         percentage: 50,
    //         isMinor: true,
    //         guardian: {
    //             fullName: 'Priya Sharma',
    //             idType: IdType.AADHAAR,
    //             idNumber: '987654321098',
    //             relationship: Relationship.OTHER,
    //         },
    //     }],

    //     // Drawdown
    //     drawdownNumber: 'DD-002',
    //     paymentReference: 'REF-002',
    //     drawdownAmount: '45000',
    //     drawdownPercentage: 50,
    //     paymentDueDate: '2026-05-01',
    //     lateFee: 1000,
    //     nextDueDate: '2027-03-01',

    //     // KYC Documents
    //     kycDocuments: [],
    // };

    const defaultValues: Partial<InvestmentFlowSchemaType> = {
        // Investment Details
        productId: undefined,
        amcId: undefined,
        amcClientCode: undefined,
        schemeId: undefined,
        capitalCommitment: undefined,
        currency: 'INR',
        feeStructure: undefined,
        inceptionDate: undefined,
        remarks: undefined,

        // Investor Status
        investorMyaltCode: undefined,
        investorResidentialStatus: undefined,
        investorSubStatus: undefined,

        // Internal Mapping
        cpId: undefined,
        creId: undefined,
        rmId: undefined,
        fmId: undefined,
        branchCode: undefined,

        // DP & Bank
        dpType: undefined,
        dpName: undefined,
        dpId: undefined,
        clientId: undefined,
        bankId: null,
        bankName: undefined,
        accountNumber: undefined,
        ifsc: undefined,
        accountType: undefined,

        // Holding Mode
        holdingMode: HoldingMode.SINGLE,

        // Primary Holder
        holders: [{
            pan: '',
            name: '',
            dob: '',
            gender: '',
            email: undefined,
            mobile: undefined,
            address: {
                addressLine1: undefined,
                addressLine2: undefined,
                city: undefined,
                state: undefined,
                pincode: undefined,
                country: undefined,
            },
            isMinor: false,
        }],

        // Nominees
        nominees: [{
            name: '',
            idType: IdType.AADHAAR,
            idNumber: '',
            relationship: '',
            percentage: 0,
            isMinor: false,
        }],

        // Drawdown
        drawdownNumber: undefined,
        paymentReference: undefined,
        drawdownAmount: undefined,
        drawdownPercentage: 0,
        paymentDueDate: undefined,
        lateFee: 0,
        nextDueDate: undefined,

        // KYC Documents
        kycDocuments: [],
    };

    

    const { control, register, handleSubmit, setValue, watch, setError, reset, formState: { errors, isDirty } } = useForm(InvestmentFlowSchema, {
        defaultValues,
    }) as UseFormReturn<InvestmentFlowSchemaType>;

    // Reset form with default values on mount
    useEffect(() => {
        reset(defaultValues);
    }, [reset]);

    // Cast errors to any to avoid strict type checks on nested fields
    const formErrors: any = errors;

    const { handleInvestorUniqueIdBlur, investorId } = useHolderAutofill(setValue);

    const { fields: holderFields, append: appendHolder, remove: removeHolder } = useFieldArray({
        control,
        name: "holders"
    });

    const { fields: nomineeFields, append: appendNominee, remove: removeNominee } = useFieldArray({
        control,
        name: "nominees"
    });

    // Watchers for dynamic behavior
    const watchProduct = watch('productId');
    const watchAmc = watch('amcId');
    const watchBankId = watch('bankId');

    // Data Fetching
    const { data: productList } = useGetProductListQuery();
    
    // Fetch AMCs only when product is selected
    const { data: amcList } = useGetAmcListQuery(
        watchProduct ? { productId: watchProduct } : {},
        { skip: !watchProduct }
    );
    
    // Fetch Schemes only when AMC is selected
    const { data: schemeList } = useGetSchemeListQuery(
        watchAmc ? { amcId: watchAmc } : {},
        { skip: !watchAmc }
    );
    
    const { data: distributorList } = useGetDistributorsQuery({ limit: 1000 });
    const { data: userList } = useGetUsersQuery({ limit: 1000 });
    const { data: fmList } = useGetFundManagerListQuery();
    
    // Fetch banks for investor using RTK Query - only fetch if investorId exists
    const { data: bankList } = useGetBanksQuery(
        investorId ? { investorId } : { investorId: '' },
        { skip: !investorId }
    );
    

    // Options
    const productOptions = productList?.data?.map((p: any) => ({ label: p.name, value: p.id, code: p.code })) || [];
    const amcOptions = amcList?.data?.map((a: any) => ({ label: `${a.name} (${a.amcCode})`, value: a.id })) || [];
    const schemeOptions = schemeList?.data?.map((s: any) => ({ label: `${s.schemeName} (${s.schemeCode})`, value: s.id })) || [];
    const cpOptions = distributorList?.data?.map((d: any) => ({ label: `${d.name} - ${d.distributorCode}`, value: d.id })) || [];
    const fmOptions = fmList?.data?.map((f: any) => ({ label: `${f.name} - ${f.code}`, value: f.id, code: f.code })) || [];
    const bankOptions = bankList?.data?.map((b: any) => ({ label: `${b.bankName} - ${b.accountNumber}`, value: b.id })) || [];

    // Filter Users for CRE and RM
    const creOptions = userList?.data?.filter((u: any) => u.role?.slug === 'cre').map((u: any) => ({ label: `${u.firstName} ${u.lastName} - ${u.userCode}`, value: u.id})) || [];
    const rmOptions = userList?.data?.filter((u: any) => u.role?.slug === 'rm').map((u: any) => ({ label: `${u.firstName} ${u.lastName} - ${u.userCode}`, value: u.id})) || [];

    // Clear dependent fields when product changes
    useEffect(() => {
        setValue('amcId', '');
        setValue('schemeId', '');

        if (watchProduct) {
            const selectedProduct = productList?.data?.find((p: any) => p.id === watchProduct);
            if (selectedProduct) {
                if (selectedProduct.code) {
                    setValue('currency', selectedProduct.code === 'GIFT_IFSC' ? 'USD' : 'INR');
                } else {
                    setValue('capitalCommitment', undefined);
                    setValue('currency', undefined);
                }
            }
        }
    }, [watchProduct, setValue, productList]);

    // Clear scheme when AMC changes
    useEffect(() => {
        setValue('schemeId', '');
    }, [watchAmc, setValue]);

    // Auto-fill bank details when bank is selected
    useEffect(() => {
        if (watchBankId && bankList?.data) {
            const selectedBank = bankList.data.find((bank: any) => bank.id === watchBankId);
            if (selectedBank) {
                setValue('bankName', selectedBank.bankName || '');
                setValue('accountNumber', selectedBank.accountNumber || '');
                setValue('ifsc', selectedBank.ifsc || '');
                setValue('accountType', selectedBank.accountType || '');
            }
        }
    }, [watchBankId, bankList, setValue]);

    // React Router Blocker (In-app navigation)
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && currentLocation.pathname !== nextLocation.pathname
    );


    const { handleOnboard } = useInvestments();

    const onSubmit: SubmitHandler<InvestmentFlowSchemaType> = async (data) => {
        try {
            console.log("Submitting Form...", data);
            
            // Transform form data into final API payload structure
            const finalPayload = {
                investment: {
                    productId: data.productId,
                    amcId: data.amcId,
                    schemeId: data.schemeId,
                    amcClientCode: data.amcClientCode,
                    capitalCommitment: data.capitalCommitment,
                    currency: data.currency,
                    feeStructure: data.feeStructure,
                    fixedFee: data.fixedFee,
                    variableFee: data.variableFee,
                    performanceFee: data.performanceFee,
                    hurdleFee: data.hurdleFee,
                    drawdownNo: data.drawdownNo,
                    inceptionDate: data.inceptionDate,
                    remarks: data.remarks,
                },
                customerProfile: {
                    investorMyaltCode: data.investorMyaltCode,
                    investorResidentialStatus: data.investorResidentialStatus,
                    investorSubStatus: data.investorSubStatus,
                },
                portfolioAccount: {
                    holdingMode: data.holdingMode,
                },
                dematAccount: {
                    dpType: data.dpType,
                    dpName: data.dpName,
                    dpId: data.dpId,
                    clientId: data.clientId,
                },
                bankAccount: {
                    bankId: data.bankId,
                    bankName: data.bankName,
                    accountNumber: data.accountNumber,
                    ifsc: data.ifsc,
                    accountType: data.accountType,
                },
                internalMapping: {
                    cpId: data.cpId,
                    creId: data.creId,
                    rmId: data.rmId,
                    fmId: data.fmId,
                    branchCode: data.branchCode,
                },
                holders: data.holders,
                nominees: data.nominees,
                kycDocuments: Object.values(uploadedDocs)
                    .flatMap((holderDocs: any) => Object.values(holderDocs))
                    .filter((doc: any) => doc && doc.fileUrl),
                drawdown: {
                    drawdownNumber: data.drawdownNumber,
                    paymentReference: data.paymentReference,
                    drawdownAmount: data.drawdownAmount,
                    drawdownPercentage: data.drawdownPercentage,
                    paymentDueDate: data.paymentDueDate,
                    paymentReceivedDate: data.paymentReceivedDate,
                    lateFee: data.lateFee,
                    nextDueDate: data.nextDueDate,
                },
            };
            
            console.log("Final Payload:", finalPayload);
            
            // Call API endpoint via hook
            await handleOnboard(finalPayload);
            navigate('/admin/investors');
        } catch (error: any) {
            console.error("Submission Error", error);
            setFormErrors(error, setError);
            // TODO: Show toast error
        }
    };

    const onError = (errors: any) => {
        console.log("Validation Errors:", errors);
    };

    // Helper to check for nested errors
    const getFieldError = (path: string) => {
        if (!formErrors) return undefined;

        const parts = path.split('.');
        let current = formErrors;
        for (const part of parts) {
            current = current?.[part];
        }
        if (current?.message) return current;

        let parentPath = parts.slice(0, -1);
        while (parentPath.length > 0) {
            let parent = formErrors;
            for (const part of parentPath) {
                parent = parent?.[part];
            }
            if (parent?.message) return parent;
            parentPath.pop();
        }

        return undefined;
    };

    const hasTabError = (fieldNames: string[]) => {
        return fieldNames.some(name => {
            return !!getFieldError(name);
        });
    };

    const tabFields = {
        "Investment Details": ['productId', 'amcId', 'schemeId', 'capitalCommitment', 'currency', 'amcClientCode', 'inceptionDate', 'feeStructure', 'remarks'],
        "Holders": ['holdingMode', 'holders', 'investorResidentialStatus', 'investorSubStatus', 'investorMyaltCode'],
        "Internal Mapping": ['cpId', 'creId', 'rmId', 'fmId', 'branchCode'],
        "DP & Bank": ['dpType', 'dpName', 'dpId', 'clientId', 'bankId', 'bankName', 'accountNumber', 'ifsc', 'accountType'],
        "Nominees": ['nominees'],
        "KYC": ['kycDocuments'],
        "Drawdowns": ['drawdownNumber', 'paymentReference', 'drawdownAmount', 'drawdownPercentage', 'paymentDueDate', 'paymentReceivedDate', 'lateFee', 'nextDueDate'],
    };

    const tabs = [
        {
            label: 'Investment Details', 
            hasError: hasTabError(tabFields["Investment Details"]),
            content: (
                <InvestmentDetailsStep 
                    control={control}
                    register={register}
                    getFieldError={getFieldError}
                    productOptions={productOptions}
                    amcOptions={amcOptions}
                    schemeOptions={schemeOptions}
                    watch={watch}
                    setValue={setValue}
                />
            ) 
        },
        { 
            label: 'Holders', 
            hasError: hasTabError(tabFields["Holders"]),
            content: (
                <HoldersStep 
                    control={control}
                    register={register}
                    getFieldError={getFieldError}
                    setValue={setValue}
                    watch={watch}
                    holderFields={holderFields}
                    appendHolder={appendHolder}
                    removeHolder={removeHolder}
                    handleInvestorUniqueIdBlur={handleInvestorUniqueIdBlur}
                    formErrors={formErrors}
                />
            )
        },
        {
            label: 'Internal Mapping',
            hasError: hasTabError(tabFields["Internal Mapping"]),
            content: (
                <InternalMappingStep 
                    control={control}
                    register={register}
                    getFieldError={getFieldError}
                    cpOptions={cpOptions}
                    creOptions={creOptions}
                    rmOptions={rmOptions}
                    fmOptions={fmOptions}
                />
            )
        },
        { 
            label: 'DP & Bank', 
            hasError: hasTabError(tabFields["DP & Bank"]),
            content: (
                <DpAndBankStep 
                    control={control}
                    register={register}
                    getFieldError={getFieldError}
                    bankOptions={bankOptions}
                />
            )
        },
        { 
            label: 'Nominees', 
            hasError: hasTabError(tabFields["Nominees"]),
            content: (
                <NomineesStep 
                    control={control}
                    register={register}
                    getFieldError={getFieldError}
                    watch={watch}
                    nomineeFields={nomineeFields}
                    appendNominee={appendNominee}
                    removeNominee={removeNominee}
                />
            )
        },
        { 
            label: 'KYC', 
            hasError: hasTabError(tabFields["KYC"]),
            content: (
                <KycStep 
                    handleOpenKycModal={(holderIndex) => {
                        setSelectedHolderForKyc(holderIndex);
                        setShowKycModal(true);
                    }}
                    holderFields={holderFields}
                    watch={watch}
                    uploadedDocs={uploadedDocs}
                    setUploadedDocs={setUploadedDocs}
                    setValue={setValue}
                />
            )
        },
        // {
        //     label: 'Drawdowns',
        //     hasError: hasTabError(tabFields["Drawdowns"]),
        //     content: (
        //         <DrawdownsStep 
        //             control={control}
        //             register={register}
        //             getFieldError={getFieldError}
        //             setValue={setValue}
        //             watch={watch}
        //         />
        //     )
        // },
    ];

    // Filter out null tabs
    const visibleTabs = tabs.filter(tab => tab !== null) as { label: string, content: React.ReactNode }[];

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <Tabs tabs={visibleTabs} activeTab={activeTab} onChange={setActiveTab} />
                <div className="flex justify-end gap-4 mt-4">
                    <Button type="submit">Final Submit</Button>
                </div>
            </Form>
            
            <KycUploadModal
                isOpen={showKycModal}
                onClose={() => setShowKycModal(false)}
                holderFields={holderFields}
                watch={watch}
                initialHolderIndex={selectedHolderForKyc}
                onUploadSuccess={(docType, response) => {
                    const holderIndex = response.holderIndex;
                    setUploadedDocs((prev: any) => ({
                        ...prev,
                        [holderIndex]: {
                            ...(prev[holderIndex] || {}),
                            [docType]: {
                                id: response.id,
                                fileUrl: response.fileUrl,
                                fileName: response.fileName,
                                fileSize: response.fileSize,
                                mimeType: response.mimeType,
                                documentType: response.documentType,
                                personPan: response.personPan,
                                holderIndex: response.holderIndex,
                            }
                        }
                    }));
                }}
                uploadedDocs={uploadedDocs[selectedHolderForKyc] || {}}
                onRemoveDoc={(docType) => {
                    setUploadedDocs((prev: any) => {
                        const newDocs = { ...prev };
                        if (newDocs[selectedHolderForKyc]) {
                            const newHolderDocs = { ...newDocs[selectedHolderForKyc] };
                            delete newHolderDocs[docType];
                            newDocs[selectedHolderForKyc] = newHolderDocs;
                        }
                        return newDocs;
                    });
                }}
            />
            
            <ConfirmationModal 
                isOpen={blocker.state === 'blocked'} 
                onClose={() => blocker.reset && blocker.reset()}
                onConfirm={() => blocker.proceed && blocker.proceed()}
                title="Unsaved Changes"
                message="You have unsaved changes. Are you sure you want to leave this page?"
                confirmText="Leave"
                cancelText="Stay"
            />
        </>
    );
};
