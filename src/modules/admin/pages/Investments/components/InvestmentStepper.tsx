import React, { useState, useEffect } from 'react';
import { useFieldArray, SubmitHandler, FieldErrors } from 'react-hook-form';
import { InvestmentFlowSchema, InvestmentFlowSchemaType } from '../schema/investmentFlowSchema';
import { Tabs } from '@/shared/components/common/Tabs';
import DynamicFormField from '@/shared/components/form/FormField/DynamicFormField';
import Button from '@/shared/components/ui/button/Button';
import Form from '@/shared/components/form/Form';
import { PlusIcon, TrashBinIcon } from '@/shared/icons';
import { useHolderAutofill } from '../hooks/useHolderAutofill';
import RadioGroup from '@/shared/components/form/RadioGroup';
import { useForm } from '@/shared/hooks/useForm';
import { useGetAmcListQuery, useGetProductListQuery, useGetSchemeListQuery, useGetFundManagerListQuery } from '@/shared/services/api/masterDataApi';
import { useGetDistributorsQuery } from '../../Distributors/api/distributorApi';
import { useGetUsersQuery } from '../../Users/api/userApi';
import { setFormErrors } from '@/shared/utils/formUtils';
import { useBlocker } from 'react-router';
import { ConfirmationModal } from '@/shared/components/common/ConfirmationModal';

export const InvestmentStepper = () => {
    const [activeTab, setActiveTab] = useState(0);

    const defaultValues: Partial<InvestmentFlowSchemaType> = {
        holdingMode: 'SINGLE',
        investorMyaltCode: '',
        investorResidentialStatus: { value: '', scope: 'INVESTMENT' },
        investorSubStatus: { value: '', scope: 'INVESTMENT' },
        holders: [{
            pan: { value: '', scope: 'INVESTMENT' },
            name: { value: '', scope: 'INVESTMENT' },
            dob: { value: '', scope: 'INVESTMENT' },
            gender: { value: '', scope: 'INVESTMENT' },
            email: { value: '', scope: 'INVESTMENT' },
            mobile: { value: '', scope: 'INVESTMENT' },
            address: {
                addressLine1: { value: '', scope: 'INVESTMENT' },
                addressLine2: { value: '', scope: 'INVESTMENT' },
                city: { value: '', scope: 'INVESTMENT' },
                state: { value: '', scope: 'INVESTMENT' },
                pincode: { value: '', scope: 'INVESTMENT' },
                country: { value: '', scope: 'INVESTMENT' },
            }
        }],
        nominees: [],
        kycDocuments: {},
    };

    const { control, register, handleSubmit, setValue, watch, setError, formState: { errors, isDirty } } = useForm(InvestmentFlowSchema, {
        defaultValues,
    });

    // Cast errors to any to avoid strict type checks on nested fields
    const formErrors: any = errors;

    const { handlePanBlur } = useHolderAutofill(setValue);

    const { fields: holderFields, append: appendHolder, remove: removeHolder } = useFieldArray({
        control,
        name: "holders"
    });

    const { fields: nomineeFields, append: appendNominee, remove: removeNominee } = useFieldArray({
        control,
        name: "nominees"
    });

    // Data Fetching
    const { data: productList } = useGetProductListQuery();
    const { data: amcList } = useGetAmcListQuery();
    const { data: schemeList } = useGetSchemeListQuery();
    const { data: distributorList } = useGetDistributorsQuery({ limit: 1000 });
    const { data: userList } = useGetUsersQuery({ limit: 1000 });
    const { data: fmList } = useGetFundManagerListQuery();

    // Options
    const productOptions = productList?.data?.map((p: any) => ({ label: p.name, value: p.id, code: p.name })) || [];
    const amcOptions = amcList?.data?.map((a: any) => ({ label: a.name, value: a.id, code: a.amcCode })) || [];
    const schemeOptions = schemeList?.data?.map((s: any) => ({ label: s.schemeName, value: s.id, code: s.schemeCode })) || [];
    const cpOptions = distributorList?.data?.map((d: any) => ({ label: d.name, value: d.id, code: d.distributorCode })) || [];
    const fmOptions = fmList?.data?.map((f: any) => ({ label: f.name, value: f.id })) || [];

    // Filter Users for CRE and RM
    const creOptions = userList?.data?.filter((u: any) => u.role?.slug === 'CRE' || u.role?.name === 'CRE').map((u: any) => ({ label: `${u.firstName} ${u.lastName}`, value: u.id, code: u.employeeId || u.userCode })) || [];
    const rmOptions = userList?.data?.filter((u: any) => u.role?.slug === 'RM' || u.role?.name === 'RM').map((u: any) => ({ label: `${u.firstName} ${u.lastName}`, value: u.id, code: u.employeeId || u.userCode })) || [];

    // Watchers for dynamic behavior
    const watchProduct = watch('productType');
    const watchResidentialStatus = watch('investorResidentialStatus.value');
    const watchHoldingMode = watch('holdingMode');
    const watchAmc = watch('amcName');
    const watchScheme = watch('scheme');
    const watchCp = watch('cpId');
    const watchCre = watch('creId');
    const watchRm = watch('rmId');

    // React Router Blocker (In-app navigation)
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && currentLocation.pathname !== nextLocation.pathname
    );


    const onSubmit: SubmitHandler<InvestmentFlowSchemaType> = async (data) => {
        try {
            console.log("Submitting Form...", data);
            // await apiCall(data);
            console.log("Form Submitted Successfully", data);
        } catch (error: any) {
            console.error("Submission Error", error);
            setFormErrors(error, setError);
        }
    };

    const onError = (errors: any) => {
        console.log("Validation Errors:", errors);
    };
    
    const scopeOptions = [
        { label: 'Investment Only', value: 'INVESTMENT' },
        { label: 'Master Profile', value: 'MASTER' },
    ];

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
        "Primary Holder": [
            'holders.0.pan.value', 'holders.0.name.value', 'holders.0.dob.value', 'holders.0.gender.value', 'holders.0.email.value', 'holders.0.mobile.value',
            'holders.0.address.addressLine1.value', 'holders.0.address.addressLine2.value', 'holders.0.address.city.value', 'holders.0.address.state.value', 'holders.0.address.pincode.value', 'holders.0.address.country.value',
            'investorResidentialStatus.value', 'investorSubStatus.value', 'investorMyaltCode'
        ],
        "Product Selection": ['productType', 'amcName', 'scheme', 'capitalCommitment', 'amcSharing'],
        "Internal Mapping": ['cpId', 'creId', 'rmId'],
        "Fee & Drawdown": ['feeStructure', 'drawdownNo', 'drawdownAmount', 'drawdownPercentage'],
        "Additional Holders": ['holdingMode', 'holders'],
        "Nominees": ['nominees'],
        "Bank & DP": ['bankId', 'dpType', 'accountNumber'],
        "KYC Upload": ['kycDocuments'],
    };

    const tabs = [
        {
            label: 'Primary Holder',
            hasError: hasTabError(tabFields["Primary Holder"]),
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DynamicFormField 
                        control={control} 
                        label="PAN" 
                        error={getFieldError("holders.0.pan.value")} 
                        {...register('holders.0.pan.value')} 
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => handlePanBlur(e, 0)} 
                    />
                    {/* <RadioGroup name="holders.0.pan.scope" label="Apply change to:" options={scopeOptions} control={control} /> */}
                    <DynamicFormField control={control} label="Myalt Code" disabled={true} error={getFieldError("investorMyaltCode")} {...register('investorMyaltCode')} />
                    <DynamicFormField control={control} label="Name" error={getFieldError("holders.0.name.value")} {...register('holders.0.name.value')} />
                    <DynamicFormField 
                        control={control} 
                        name="holders.0.dob.value" 
                        label="DOB" 
                        type="date-picker" 
                        setValue={setValue}
                        value={watch('holders.0.dob.value')}
                        error={getFieldError("holders.0.dob.value")}
                    />
                    <DynamicFormField control={control} name="holders.0.gender.value" label="Gender" type="select" options={[{label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'}, {label: 'Other', value: 'Other'}]} error={getFieldError("holders.0.gender.value")} />
                    <DynamicFormField control={control} label="Mobile" error={getFieldError("holders.0.mobile.value")} {...register('holders.0.mobile.value')} />
                    <DynamicFormField control={control} label="Email" error={getFieldError("holders.0.email.value")} {...register('holders.0.email.value')} />

                    <DynamicFormField 
                        control={control} 
                        name="investorResidentialStatus.value" 
                        label="Residential Status" 
                        type="select" 
                        options={[{label: 'Resident', value: 'Resident'}, {label: 'NRI', value: 'NRI'}, {label: 'Non-Individual', value: 'Non-Individual'}]} 
                        error={getFieldError("investorResidentialStatus.value")}
                    />
                    {watchResidentialStatus === 'Non-Individual' && (
                        <DynamicFormField 
                            control={control} 
                            name="investorSubStatus.value" 
                            label="Sub Status" 
                            type="select" 
                            options={[
                                {label: 'Private Ltd Company', value: 'Private Ltd Company'},
                                {label: 'Public Ltd Company', value: 'Public Ltd Company'},
                                {label: 'Limited Liability Partnership', value: 'Limited Liability Partnership'},
                                {label: 'Partnership Firm', value: 'Partnership Firm'},
                                {label: 'Trust', value: 'Trust'},
                                {label: 'HUF', value: 'HUF'},
                                {label: 'Sole Proprietorship', value: 'Sole Proprietorship'}
                            ]} 
                            error={getFieldError("investorSubStatus.value")}
                        />
                    )}
                    
                    <h3 className="col-span-full font-semibold mt-4 mb-2">Address</h3>
                    <DynamicFormField control={control} label="Address Line 1" error={getFieldError("holders.0.address.addressLine1.value")} {...register('holders.0.address.addressLine1.value')} />
                    <DynamicFormField control={control} label="Address Line 2" error={getFieldError("holders.0.address.addressLine2.value")} {...register('holders.0.address.addressLine2.value')} />
                    <DynamicFormField control={control} label="City" error={getFieldError("holders.0.address.city.value")} {...register('holders.0.address.city.value')} />
                    <DynamicFormField control={control} label="State" error={getFieldError("holders.0.address.state.value")} {...register('holders.0.address.state.value')} />
                    <DynamicFormField control={control} label="Pincode" error={getFieldError("holders.0.address.pincode.value")} {...register('holders.0.address.pincode.value')} />
                    <DynamicFormField control={control} label="Country" error={getFieldError("holders.0.address.country.value")} {...register('holders.0.address.country.value')} />
                </div>
            ),
        },
        { 
            label: 'Product Selection', 
            hasError: hasTabError(tabFields["Product Selection"]),
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DynamicFormField control={control} name="productType" label="Product" type="select" options={productOptions} error={getFieldError("productType")} />
                    <DynamicFormField control={control} name="amcName" label="AMC Name" type="select" options={amcOptions} error={getFieldError("amcName")} />
                    <DynamicFormField control={control} label="AMC Code" disabled={true} error={getFieldError("amcCode")} {...register('amcCode')} />
                    <DynamicFormField control={control} label="AMC Client Code" error={getFieldError("amcClientCode")} {...register('amcClientCode')} />
                    
                    <DynamicFormField control={control} name="scheme" label="Strategy Name / Scheme" type="select" options={schemeOptions} error={getFieldError("scheme")} />
                    <DynamicFormField control={control} label="Strategy Code" disabled={true} error={getFieldError("strategyCode")} {...register('strategyCode')} />
                    
                    {(productOptions.find((p: any) => p.value === watchProduct)?.code === 'AIF' || productOptions.find((p: any) => p.value === watchProduct)?.code === 'GIFT AIF') && (
                        <DynamicFormField control={control} label={`Capital Commitment${productOptions.find((p: any) => p.value === watchProduct)?.code === 'GIFT AIF' ? ' (USD)' : ''}`} type="number" error={getFieldError("capitalCommitment")} {...register('capitalCommitment')} />
                    )}
                    <DynamicFormField control={control} label="Currency" disabled={true} error={getFieldError("currency")} {...register('currency')} />
                    <DynamicFormField control={control} label="AMC Sharing" type="number" error={getFieldError("amcSharing")} {...register('amcSharing')} />
                    <DynamicFormField 
                        control={control} 
                        name="inceptionDate" 
                        label="Inception Date" 
                        type="date-picker"
                        setValue={setValue}
                        value={watch('inceptionDate')}
                        error={getFieldError("inceptionDate")}
                    />
                </div>
            ) 
        },
        {
            label: 'Internal Mapping',
            hasError: hasTabError(tabFields["Internal Mapping"]),
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DynamicFormField control={control} name="cpId" label="CP Name" type="select" options={cpOptions} error={getFieldError("cpId")} />
                    <DynamicFormField control={control} label="CP Code" disabled={true} error={getFieldError("cpCode")} {...register('cpCode')} />
                    <DynamicFormField control={control} name="creId" label="CRE Name" type="select" options={creOptions} error={getFieldError("creId")} />
                    <DynamicFormField control={control} label="CRE Code" disabled={true} error={getFieldError("creCode")} {...register('creCode')} />
                    <DynamicFormField control={control} name="rmId" label="RM Name" type="select" options={rmOptions} error={getFieldError("rmId")} />
                    <DynamicFormField control={control} label="RM Code" disabled={true} error={getFieldError("rmCode")} {...register('rmCode')} />
                    <DynamicFormField control={control} name="fmCode" label="FM Name" type="select" options={fmOptions} error={getFieldError("fmCode")} />
                    <DynamicFormField control={control} label="Branch Code" error={getFieldError("branchCode")} {...register('branchCode')} />
                </div>
            )
        },
        {
            label: 'Fee & Drawdown',
            hasError: hasTabError(tabFields["Fee & Drawdown"]),
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DynamicFormField control={control} label="Fee Structure" error={getFieldError("feeStructure")} {...register('feeStructure')} />
                    <DynamicFormField control={control} label="Drawdown No." error={getFieldError("drawdownNo")} {...register('drawdownNo')} />
                    <DynamicFormField control={control} label="Payment Reference No" error={getFieldError("paymentReferenceNo")} {...register('paymentReferenceNo')} />
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
                    <DynamicFormField control={control} label="Remarks" type="textarea" error={getFieldError("remarks")} {...register('remarks')} />
                </div>
            )
        },
        { 
            label: 'Additional Holders', 
            hasError: hasTabError(tabFields["Additional Holders"]),
            content: (
                <div>
                    <div className="mb-4">
                        <DynamicFormField control={control} label="Holding Mode" type="select" options={[{label: 'Single', value: 'SINGLE'}, {label: 'Joint', value: 'JOINT'}]} error={getFieldError("holdingMode")} {...register(`holdingMode`)} />
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
                                <DynamicFormField control={control} label="PAN" error={getFieldError(`holders.${index}.pan.value`)} {...register(`holders.${index}.pan.value`)} onBlur={(e: React.FocusEvent<HTMLInputElement>) => handlePanBlur(e, index)} />
                                <DynamicFormField control={control} label="Name" error={getFieldError(`holders.${index}.name.value`)} {...register(`holders.${index}.name.value`)} />
                                <DynamicFormField 
                                    control={control} 
                                    name={`holders.${index}.dob.value`} 
                                    label="DOB" 
                                    type="date-picker" 
                                    setValue={setValue}
                                    value={watch(`holders.${index}.dob.value`)}
                                    error={getFieldError(`holders.${index}.dob.value`)}
                                />
                                <DynamicFormField control={control} name={`holders.${index}.gender.value`} label="Gender" type="select" options={[{label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'}, {label: 'Other', value: 'Other'}]} error={getFieldError(`holders.${index}.gender.value`)} />
                                <DynamicFormField control={control} label="Mobile" error={getFieldError(`holders.${index}.mobile.value`)} {...register(`holders.${index}.mobile.value`)} />
                                <DynamicFormField control={control} label="Email" error={getFieldError(`holders.${index}.email.value`)} {...register(`holders.${index}.email.value`)} />
                                
                                <DynamicFormField control={control} label="Address Line 1" error={getFieldError(`holders.${index}.address.addressLine1.value`)} {...register(`holders.${index}.address.addressLine1.value`)} />
                                <DynamicFormField control={control} label="Address Line 2" error={getFieldError(`holders.${index}.address.addressLine2.value`)} {...register(`holders.${index}.address.addressLine2.value`)} />
                                <DynamicFormField control={control} label="City" error={getFieldError(`holders.${index}.address.city.value`)} {...register(`holders.${index}.address.city.value`)} />
                                <DynamicFormField control={control} label="State" error={getFieldError(`holders.${index}.address.state.value`)} {...register(`holders.${index}.address.state.value`)} />
                                <DynamicFormField control={control} label="Pincode" error={getFieldError(`holders.${index}.address.pincode.value`)} {...register(`holders.${index}.address.pincode.value`)} />
                                <DynamicFormField control={control} label="Country" error={getFieldError(`holders.${index}.address.country.value`)} {...register(`holders.${index}.address.country.value`)} />

                                {watchHoldingMode === 'JOINT' && holderFields.length < 3 && (
                                    <Button type="button" onClick={() => removeHolder(index)} className="absolute top-2 right-2"><TrashBinIcon /></Button>
                                )}
                            </div>
                        )
                    ))}
                    {watchHoldingMode === 'JOINT' && holderFields.length < 3 && (
                        <Button type="button" onClick={() => appendHolder({ pan: { value: '', scope: 'INVESTMENT' }, name: { value: '', scope: 'INVESTMENT' }, dob: { value: '', scope: 'INVESTMENT' }, gender: { value: '', scope: 'INVESTMENT' }, email: { value: '', scope: 'INVESTMENT' }, mobile: { value: '', scope: 'INVESTMENT' } })}>Add Holder</Button>
                    )}
                </div>
            )
        },
        { 
            label: 'Nominees', 
            hasError: hasTabError(tabFields["Nominees"]),
            content: (
                <div>
                    {nomineeFields.map((field, index) => (
                        <div key={field.id} className="border p-4 my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <DynamicFormField control={control} label="Name" error={getFieldError(`nominees.${index}.name`)} {...register(`nominees.${index}.name`)} />
                            <DynamicFormField control={control} name={`nominees.${index}.idType`} label="ID Type" type="select" options={[{label: 'PAN', value: 'PAN'}, {label: 'Aadhaar', value: 'Aadhaar'}, {label: 'Passport', value: 'Passport'}]} error={getFieldError(`nominees.${index}.idType`)} />
                            <DynamicFormField control={control} label="ID Number" error={getFieldError(`nominees.${index}.idNumber`)} {...register(`nominees.${index}.idNumber`)} />
                            <DynamicFormField control={control} name={`nominees.${index}.relationship`} label="Relationship" type="select" options={[{label: 'Spouse', value: 'Spouse'}, {label: 'Child', value: 'Child'}, {label: 'Other', value: 'Other'}]} error={getFieldError(`nominees.${index}.relationship`)} />
                            <DynamicFormField control={control} label="Percentage" type="number" error={getFieldError(`nominees.${index}.percentage`)} {...register(`nominees.${index}.percentage`)} />
                            
                            <DynamicFormField control={control} name={`nominees.${index}.isMinor`} label="Is Minor?" type="checkbox" />
                            
                            {/* Ideally conditional on isMinor, for now showing */}
                            <DynamicFormField control={control} label="Guardian Name" error={getFieldError(`nominees.${index}.guardianName`)} {...register(`nominees.${index}.guardianName`)} />
                            <DynamicFormField control={control} name={`nominees.${index}.guardianIdType`} label="Guardian ID Type" type="select" options={[{label: 'PAN', value: 'PAN'}, {label: 'Aadhaar', value: 'Aadhaar'}]} error={getFieldError(`nominees.${index}.guardianIdType`)} />
                            <DynamicFormField control={control} label="Guardian ID Number" error={getFieldError(`nominees.${index}.guardianIdNumber`)} {...register(`nominees.${index}.guardianIdNumber`)} />

                            <Button type="button" onClick={() => removeNominee(index)}><TrashBinIcon /></Button>
                        </div>
                    ))}
                    {nomineeFields.length < 3 && (
                        <Button type="button" onClick={() => appendNominee({ name: '', percentage: 0 })}>Add Nominee</Button>
                    )}
                </div>
            )
        },
        { 
            label: 'Bank & DP', 
            hasError: hasTabError(tabFields["Bank & DP"]),
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DynamicFormField control={control} name="dpType" label="DP Type" type="select" options={[{label: 'NSDL', value: 'NSDL'}, {label: 'CDSL', value: 'CDSL'}]} error={getFieldError("dpType")} />
                    <DynamicFormField control={control} label="DP Name" error={getFieldError("dpName")} {...register('dpName')} />
                    <DynamicFormField control={control} label="DP ID" error={getFieldError("dpId")} {...register('dpId')} />
                    <DynamicFormField control={control} label="Client ID" error={getFieldError("clientId")} {...register('clientId')} />
                    <DynamicFormField control={control} name="bankId" label="Bank" error={getFieldError("bankId")} />
                    <DynamicFormField control={control} label="Bank Name" error={getFieldError("bankName")} {...register('bankName')} />
                    <DynamicFormField control={control} label="Account Number" error={getFieldError("accountNumber")} {...register('accountNumber')} />
                    <DynamicFormField control={control} label="IFSC" error={getFieldError("ifsc")} {...register('ifsc')} />
                    <DynamicFormField control={control} name="accountType" label="Account Type" type="select" options={[{label: 'Savings', value: 'Savings'}, {label: 'Current', value: 'Current'}, {label: 'NRE', value: 'NRE'}, {label: 'NRO', value: 'NRO'}]} error={getFieldError("accountType")} />
                </div>
            )
        },
        { 
            label: 'KYC Upload', 
            hasError: hasTabError(tabFields["KYC Upload"]),
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DynamicFormField control={control} name="kycDocuments.pan" label="PAN" type="file" />
                    <DynamicFormField control={control} name="kycDocuments.addressProof" label="Address Proof" type="file" />
                    <DynamicFormField control={control} name="kycDocuments.bankProof" label="Bank Proof" type="file" />
                    <DynamicFormField control={control} name="kycDocuments.others" label="Others" type="file" />
                </div>
            )
        },
        { label: 'Review & Submit', content: <div>Review & Submit</div> },
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