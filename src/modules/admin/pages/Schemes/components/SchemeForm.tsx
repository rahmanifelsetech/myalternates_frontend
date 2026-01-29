import React, { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useForm } from '@shared/hooks/useForm';
import { SchemeSchema, SchemeSchemaType } from '../schema/schemeSchema';
import { Scheme } from '../types/scheme';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import ComponentCard from '@shared/components/common/ComponentCard';
import { Tabs } from '@shared/components/common/Tabs';
import { setFormErrors } from '@shared/utils/formUtils';
import {
    useGetAmcListQuery,
    useGetAssetClassListQuery,
    useGetBenchmarkIndexListQuery,
    useGetCategoryListQuery,
    useGetFundManagerListQuery,
    useGetProductListQuery,
} from '../api/schemeApi';
import { PlusIcon, TrashBinIcon } from '@shared/icons';
import { formatDate } from '@shared/utils/dateUtils';
import { typographyClasses } from '@shared/utils/typographyUtils';
import {
    INVESTOR_TYPES,
    FUND_TYPES,
    SCHEME_TYPES,
    FUND_APPROACHES,
    PERFORMANCE_TYPES,
    REPORTING_STRUCTURES,
    IA_STRUCTURES,
    FEE_STRUCTURES,
} from '@/modules/admin/pages/Schemes/scheme.constants';

interface SchemeFormProps {
    scheme?: Scheme | null;
    onSubmit: (data: SchemeSchemaType) => Promise<any>;
    onCancel: () => void;
    isLoading: boolean;
}

const emptyValues: SchemeSchemaType = {
    amcId: '',
    schemeCode: '',
    schemeName: '',
    isFeatured: false,
    priorityOrder: 0,
    isActive: true,

    // Initialize all nullable fields to null or appropriate defaults
    productId: null,
    color: null,
    categoryId: null,
    subCategoryId: null,
    assetClassId: null,
    benchmarkIndexId: null,
    benchmarkShortIndexId: null,
    iaStructure: null,
    iaShortName: null,
    aum: null,
    avgMarketCap: null,
    reportingStructure: null,
    comparisonReportingStructure: null,
    about: null,
    investmentObjective: null,
    investmentApproach: null,
    iaTheme: null,
    keyStrength: null,
    schemeInceptionDate: null,
    setupFees: null,
    largeCap: null,
    midCap: null,
    smallCap: null,
    cashEquivalent: null,
    others: null,
    sipOption: null,
    stpOption: null,
    topupOption: null,
    feeProfitShare: null,
    feeStructure: null,
    feeFixedAmc: null,
    feeVariableAmc: null,
    feeHurdle: null,
    remarksForFeeStructure: null,
    exitLoad1Yr: null,
    exitLoad2Yr: null,
    exitLoad3Yr: null,
    exitLoad: null,
    exitOption: null,
    idealStocksInPortfolio: null,
    minInvestment: null,
    minTopupAmount: null,
    initialDrawdown: null,
    isDistributable: null,
    showInDashboard: null,
    isSuggested: null,
    isOpenForSubscription: null,
    investorType: null,
    fundType: null,
    schemeType: null,
    currency: null,
    fundApproach: null,
    fundApproachDescription: null,
    fundTenure: null,
    fundTenureDescription: null,
    fundTargetSize: null,
    fundTargetSizeDescription: null,
    minCommitment: null,
    minCommitmentDescription: null,
    drawdown: null,
    drawdownDescription: null,
    targettedGrossIrr: null,
    targettedGrossIrrDescription: null,
    whoCanInvest: null,
    whoCannotInvest: null,
    tentativeBalanceCommitmentCall: null,
    sponsorCommitment: null,
    tentativeFinalClosing: null,
    subscriptionAndRedemption: null,
    navFrequency: null,
    custody: null,
    registrarAndTransferAgent: null,
    trustee: null,
    assetStructure: null,
    legalAdvisor: null,
    taxAdvisor: null,
    taxation: null,
    performanceNote: null,
    top5Holdings: [],
    top5Sectors: [],
    fundManagers: [],
    performance: [],
    overallPerformance: {
        schemeRet1m: null,
        schemeRet3m: null,
        schemeRet6m: null,
        schemeRet1y: null,
        schemeRet2y: null,
        schemeRet3y: null,
        schemeRet5y: null,
        schemeRet10y: null,
        schemeRetSinceInception: null,
        bmRet1m: null,
        bmRet3m: null,
        bmRet6m: null,
        bmRet1y: null,
        bmRet2y: null,
        bmRet3y: null,
        bmRet5y: null,
        bmRet10y: null,
        bmRetSinceInception: null,
    },
};

export const SchemeForm: React.FC<SchemeFormProps> = ({ scheme, onSubmit, onCancel, isLoading }) => {
    const initialValues = React.useMemo(() => (scheme ? {
        ...scheme,
        amcId: scheme.amcId ?? '',
        productId: scheme.productId ?? null,
        schemeCode: scheme.schemeCode ?? '',
        schemeName: scheme.schemeName ?? '',
        color: scheme.color ?? null,
        categoryId: scheme.categoryId ?? null,
        subCategoryId: scheme.subCategoryId ?? null,
        assetClassId: scheme.assetClassId ?? null,
        benchmarkIndexId: scheme.benchmarkIndexId ?? null,
        benchmarkShortIndexId: scheme.benchmarkShortIndexId ?? null,
        iaStructure: scheme.iaStructure ?? null,
        iaShortName: scheme.iaShortName ?? null,
        aum: scheme.aum ?? null,
        avgMarketCap: scheme.avgMarketCap ?? null,
        reportingStructure: scheme.reportingStructure ?? null,
        comparisonReportingStructure: scheme.comparisonReportingStructure ?? null,
        about: scheme.about ?? null,
        investmentObjective: scheme.investmentObjective ?? null,
        investmentApproach: scheme.investmentApproach ?? null,
        iaTheme: scheme.iaTheme ?? null,
        keyStrength: scheme.keyStrength ?? null,
        schemeInceptionDate: scheme.schemeInceptionDate ? formatDate(scheme.schemeInceptionDate) : null,
        setupFees: scheme.setupFees ?? null,
        largeCap: scheme.largeCap ?? null,
        midCap: scheme.midCap ?? null,
        smallCap: scheme.smallCap ?? null,
        cashEquivalent: scheme.cashEquivalent ?? null,
        others: scheme.others ?? null,
        sipOption: scheme.sipOption ?? null,
        stpOption: scheme.stpOption ?? null,
        topupOption: scheme.topupOption ?? null,
        feeProfitShare: scheme.feeProfitShare ?? null,
        feeStructure: scheme.feeStructure ?? null,
        feeFixedAmc: scheme.feeFixedAmc ?? null,
        feeVariableAmc: scheme.feeVariableAmc ?? null,
        feeHurdle: scheme.feeHurdle ?? null,
        remarksForFeeStructure: scheme.remarksForFeeStructure ?? null,
        exitLoad1Yr: scheme.exitLoad1Yr ?? null,
        exitLoad2Yr: scheme.exitLoad2Yr ?? null,
        exitLoad3Yr: scheme.exitLoad3Yr ?? null,
        exitLoad: scheme.exitLoad ?? null,
        exitOption: scheme.exitOption ?? null,
        idealStocksInPortfolio: scheme.idealStocksInPortfolio ? parseInt(scheme.idealStocksInPortfolio as any, 10) : null,
        minInvestment: scheme.minInvestment ?? null,
        minTopupAmount: scheme.minTopupAmount ?? null,
        initialDrawdown: scheme.initialDrawdown ?? null,
        isDistributable: scheme.isDistributable ?? null,
        showInDashboard: scheme.showInDashboard ?? null,
        isSuggested: scheme.isSuggested ?? null,
        isOpenForSubscription: scheme.isOpenForSubscription ?? null,
        isActive: scheme.isActive ?? true,
        investorType: scheme.investorType ?? null,
        fundType: scheme.fundType ?? null,
        schemeType: scheme.schemeType ?? null,
        currency: scheme.currency ?? null,
        fundApproach: scheme.fundApproach ?? null,
        fundApproachDescription: scheme.fundApproachDescription ?? null,
        fundTenure: scheme.fundTenure ?? null,
        fundTenureDescription: scheme.fundTenureDescription ?? null,
        fundTargetSize: scheme.fundTargetSize ?? null,
        fundTargetSizeDescription: scheme.fundTargetSizeDescription ?? null,
        minCommitment: scheme.minCommitment ?? null,
        minCommitmentDescription: scheme.minCommitmentDescription ?? null,
        drawdown: scheme.drawdown ?? null,
        drawdownDescription: scheme.drawdownDescription ?? null,
        targettedGrossIrr: scheme.targettedGrossIrr ?? null,
        targettedGrossIrrDescription: scheme.targettedGrossIrrDescription ?? null,
        priorityOrder: scheme.priorityOrder ? parseInt(scheme.priorityOrder as any, 10) : null,
        whoCanInvest: scheme.whoCanInvest ?? null,
        whoCannotInvest: scheme.whoCannotInvest ?? null,
        tentativeBalanceCommitmentCall: scheme.tentativeBalanceCommitmentCall ?? null,
        sponsorCommitment: scheme.sponsorCommitment ?? null,
        tentativeFinalClosing: scheme.tentativeFinalClosing ?? null,
        subscriptionAndRedemption: scheme.subscriptionAndRedemption ?? null,
        navFrequency: scheme.navFrequency ?? null,
        custody: scheme.custody ?? null,
        registrarAndTransferAgent: scheme.registrarAndTransferAgent ?? null,
        trustee: scheme.trustee ?? null,
        assetStructure: scheme.assetStructure ?? null,
        legalAdvisor: scheme.legalAdvisor ?? null,
        taxAdvisor: scheme.taxAdvisor ?? null,
        taxation: scheme.taxation ?? null,
        performanceNote: scheme.performanceNote ?? null,
        top5Holdings: scheme.top5Holdings ? scheme.top5Holdings.map(h => ({ ...h, value: String(h.value) })) : [],
        top5Sectors: scheme.top5Sectors ? scheme.top5Sectors.map(s => ({ ...s, value: String(s.value) })) : [],
        fundManagers: scheme.fundManagers ?? [],
        performance: scheme.performance ?? [],
    } as SchemeSchemaType : { ...emptyValues }), [scheme]);

    const {
        control,
        handleSubmit,
        reset,
        setError,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm(SchemeSchema, initialValues);

    const productId = watch('productId');
    const { data: amcList } = useGetAmcListQuery({ productId }, { skip: !productId });
    const { data: productList } = useGetProductListQuery();
    const { data: categoryList } = useGetCategoryListQuery();
    const { data: assetClassList } = useGetAssetClassListQuery();
    const { data: benchmarkIndexList } = useGetBenchmarkIndexListQuery();
    const { data: fundManagerList } = useGetFundManagerListQuery();

    const selectedProduct = productList?.data?.find((p: any) => p.id === productId);

    const amcCategoryOptions = React.useMemo(() => {
        if (selectedProduct?.code === 'AIF') {
            return ["CAT1", "CAT2", "CAT3"].map(c => ({ label: c, value: c }));
        }
        if (selectedProduct?.code === 'GIFT_IFSC') {
            return ["GIFT_CAT1", "GIFT_CAT2", "GIFT_CAT3"].map(c => ({ label: c, value: c }));
        }
        return [];
    }, [selectedProduct]);

    const isAmcCategoryDisabled = !['AIF', 'GIFT_IFSC'].includes(selectedProduct?.code);

    const amcOptions = amcList?.data?.map((amc: any) => ({ label: amc.name, value: amc.id })) || [];
    const productOptions = productList?.data?.map((product: any) => ({ label: product.name, value: product.id, code: product.code })) || [];
    const categoryOptions = categoryList?.data?.map((category: any) => ({ label: category.name, value: category.id })) || [];
    const assetClassOptions = assetClassList?.data?.map((assetClass: any) => ({ label: assetClass.name, value: assetClass.id })) || [];
    const benchmarkOptions = benchmarkIndexList?.data?.map((benchmark: any) => ({ label: benchmark.name, value: benchmark.id })) || [];
    const fundManagerOptions = fundManagerList?.data?.map((fm: any) => ({ label: fm.name, value: fm.id })) || [];

    const {
        fields: fundManagerFields,
        append: appendFundManager,
        remove: removeFundManager,
    } = useFieldArray({
        control,
        name: 'fundManagers',
        shouldUnregister: true
    });

    const {
        fields: holdingFields,
        append: appendHolding,
        remove: removeHolding,
    } = useFieldArray({
        control,
        name: 'top5Holdings',
        shouldUnregister: true
    });

    const {
        fields: sectorFields,
        append: appendSector,
        remove: removeSector,
    } = useFieldArray({
        control,
        name: 'top5Sectors',
        shouldUnregister: true
    });

    const {
        fields: performanceFields,
        append: appendPerformance,
        remove: removePerformance,
    } = useFieldArray({
        control,
        name: 'performance',
        shouldUnregister: true
    });

    useEffect(() => {
        setTimeout(() => {
            reset(initialValues);
        }, 100);
    }, [initialValues, reset]);

    const handleFormSubmit = async (data: SchemeSchemaType) => {
        try {
            const cleanData = Object.fromEntries(
                Object.entries(data).map(([key, value]) => [
                    key,
                    value === "" ? undefined : value
                ])
            );

            const payload = {
                ...cleanData,
                top5Holdings: data.top5Holdings || [],
                top5Sectors: data.top5Sectors || [],
                fundManagers: data.fundManagers || [],
                performance: data.performance || [],
            };
            
            await onSubmit(payload as any);
        } catch (error: any) {
            console.error('Submission form API error:', error);
            const errorFields = Object.keys(error.errors);
            if (errorFields.length > 0) {
                const firstErrorField = errorFields[0] as keyof SchemeSchemaType;
                const tabIndex = Object.values(tabFields).findIndex(fields => fields.includes(firstErrorField));
                if (tabIndex !== -1) {
                    setActiveTab(tabIndex);
                }
            }
            setFormErrors(error, setError);
        }
    };

    const [activeTab, setActiveTab] = useState(0);

    const tabFields: Record<string, (keyof SchemeSchemaType)[]> = {
        "Basic Details": ['productId', 'amcId', 'schemeCode', 'schemeName', 'color', 'amcCat', 'categoryId', 'subCategoryId', 'assetClassId', 'benchmarkIndexId', 'benchmarkShortIndexId'],
        "Details": ['iaStructure', 'iaShortName', 'about', 'investmentObjective', 'investmentApproach', 'iaTheme', 'keyStrength', 'schemeInceptionDate'],
        "Financials": ['aum', 'avgMarketCap', 'setupFees', 'largeCap', 'midCap', 'smallCap', 'cashEquivalent', 'others'],
        "Fees & Loads": ['feeProfitShare', 'feeStructure', 'feeFixedAmc', 'feeVariableAmc', 'feeHurdle', 'remarksForFeeStructure', 'exitLoad1Yr', 'exitLoad2Yr', 'exitLoad3Yr', 'exitLoad', 'exitOption'],
        "Portfolio": ['idealStocksInPortfolio', 'minInvestment', 'minTopupAmount', 'initialDrawdown'],
        "Configuration": ['reportingStructure', 'comparisonReportingStructure', 'sipOption', 'stpOption', 'topupOption', 'isDistributable', 'showInDashboard', 'isFeatured', 'isSuggested', 'isOpenForSubscription', 'priorityOrder', 'investorType', 'fundType', 'schemeType', 'currency'],
        "Advanced": ['fundApproach', 'fundApproachDescription', 'fundTenure', 'fundTenureDescription', 'fundTargetSize', 'fundTargetSizeDescription', 'minCommitment', 'minCommitmentDescription', 'drawdown', 'drawdownDescription', 'targettedGrossIrr', 'targettedGrossIrrDescription'],
        "Policy & Legal": ['whoCanInvest', 'whoCannotInvest', 'tentativeBalanceCommitmentCall', 'sponsorCommitment', 'tentativeFinalClosing', 'subscriptionAndRedemption', 'navFrequency', 'custody', 'registrarAndTransferAgent', 'trustee', 'assetStructure', 'legalAdvisor', 'taxAdvisor', 'taxation', 'performanceNote'],
        "Dynamic Fields": ['fundManagers', 'top5Holdings', 'top5Sectors', 'performance'],
        "Overall Performance": ['overallPerformance'],
    };

    const tabs = [
        {
            label: "Basic Details",
            hasError: tabFields["Basic Details"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4`}>Basic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Product" type="select" options={productOptions} error={errors.productId} {...register('productId')} />
                        <DynamicFormField control={control} label="AMC" type="select" options={amcOptions} required error={errors.amcId} {...register('amcId')} />
                        <DynamicFormField control={control} label="AMC Category" type="select" options={amcCategoryOptions} error={errors.amcCat} {...register('amcCat')} disabled={isAmcCategoryDisabled} />
                        <DynamicFormField control={control} label="Scheme Code" required error={errors.schemeCode} {...register('schemeCode')} />
                        <DynamicFormField control={control} label="Scheme Name" required error={errors.schemeName} {...register('schemeName')} />
                        <DynamicFormField control={control} label="Color" error={errors.color} {...register('color')} />
                        <DynamicFormField control={control} label="Category" type="select" options={categoryOptions} error={errors.categoryId} {...register('categoryId')} />
                        <DynamicFormField control={control} label="Comparison Category" type="select" options={categoryOptions} error={errors.subCategoryId} {...register('subCategoryId')} />
                        <DynamicFormField control={control} label="Asset Class" type="select" options={assetClassOptions} error={errors.assetClassId} {...register('assetClassId')} />
                        <DynamicFormField control={control} label="Benchmark Index" type="select" options={benchmarkOptions} error={errors.benchmarkIndexId} {...register('benchmarkIndexId')} />
                        <DynamicFormField control={control} label="Benchmark Short Index" type="select" options={benchmarkOptions} error={errors.benchmarkShortIndexId} {...register('benchmarkShortIndexId')} />
                    </div>
                </div>
            )
        },
        {
            label: "Details",
            hasError: tabFields["Details"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Investment Approach</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="IA Structure" type="select" options={IA_STRUCTURES} error={errors.iaStructure} {...register('iaStructure')} />
                        <DynamicFormField control={control} label="IA Short Name" error={errors.iaShortName} {...register('iaShortName')} />
                    </div>

                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Scheme Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="About Scheme" type="textarea" error={errors.about} {...register('about')} />
                        <DynamicFormField control={control} label="Investment Objective" type="textarea" error={errors.investmentObjective} {...register('investmentObjective')} />
                        <DynamicFormField control={control} label="Investment Approach" type="textarea" error={errors.investmentApproach} {...register('investmentApproach')} />
                        <DynamicFormField control={control} label="IA Theme" error={errors.iaTheme} {...register('iaTheme')} />
                        <DynamicFormField control={control} label="Key Strength of Portfolio" error={errors.keyStrength} {...register('keyStrength')} />
                        <DynamicFormField control={control} name="schemeInceptionDate" label="Scheme Inception Date" type="date-picker" setValue={setValue} error={errors.schemeInceptionDate} value={watch('schemeInceptionDate')} />
                    </div>
                </div>
            )
        },
        {
            label: "Financials",
            hasError: tabFields["Financials"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Financials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="AUM" type="text" error={errors.aum} {...register('aum')} />
                        <DynamicFormField control={control} label="Avg. Market Cap" type="text" error={errors.avgMarketCap} {...register('avgMarketCap')} />
                    </div>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Fees & Portfolio Composition</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Setup Fees" type="text" error={errors.setupFees} {...register('setupFees')} />
                        <DynamicFormField control={control} label="Large Cap" type="text" error={errors.largeCap} {...register('largeCap')} />
                        <DynamicFormField control={control} label="Mid Cap" type="text" error={errors.midCap} {...register('midCap')} />
                        <DynamicFormField control={control} label="Small Cap" type="text" error={errors.smallCap} {...register('smallCap')} />
                        <DynamicFormField control={control} label="Cash Equivalent" type="text" error={errors.cashEquivalent} {...register('cashEquivalent')} />
                        <DynamicFormField control={control} label="Others" type="text" error={errors.others} {...register('others')} />
                    </div>
                </div>
            )
        },
        {
            label: "Fees & Loads",
            hasError: tabFields["Fees & Loads"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Fee Structure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Fee Profit Share" type="text" error={errors.feeProfitShare} {...register('feeProfitShare')} />
                        <DynamicFormField control={control} label="Fee Structure" type="select" options={FEE_STRUCTURES} error={errors.feeStructure} {...register('feeStructure')} />
                        <DynamicFormField control={control} label="Fee Fixed AMC" type="text" error={errors.feeFixedAmc} {...register('feeFixedAmc')} />
                        <DynamicFormField control={control} label="Fee Variable AMC" type="text" error={errors.feeVariableAmc} {...register('feeVariableAmc')} />
                        <DynamicFormField control={control} label="Fee Hurdle" type="text" error={errors.feeHurdle} {...register('feeHurdle')} />
                        <DynamicFormField control={control} label="Remarks for Fee Structure" type="textarea" error={errors.remarksForFeeStructure} {...register('remarksForFeeStructure')} />
                    </div>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Exit Loads</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Exit Load 1 Yr" type="text" error={errors.exitLoad1Yr} {...register('exitLoad1Yr')} />
                        <DynamicFormField control={control} label="Exit Load 2 Yr" type="text" error={errors.exitLoad2Yr} {...register('exitLoad2Yr')} />
                        <DynamicFormField control={control} label="Exit Load 3 Yr" type="text" error={errors.exitLoad3Yr} {...register('exitLoad3Yr')} />
                        <DynamicFormField control={control} label="Exit Load" error={errors.exitLoad} {...register('exitLoad')} />
                        <DynamicFormField control={control} label="Exit Option" error={errors.exitOption} {...register('exitOption')} />
                    </div>
                </div>
            )
        },
        {
            label: "Portfolio",
            hasError: tabFields["Portfolio"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Portfolio Construction</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Ideal Stocks In Portfolio" type="number" error={errors.idealStocksInPortfolio} {...register('idealStocksInPortfolio')} />
                        <DynamicFormField control={control} label="Min Investment" type="text" error={errors.minInvestment} {...register('minInvestment')} />
                        <DynamicFormField control={control} label="Min Topup Amount" type="text" error={errors.minTopupAmount} {...register('minTopupAmount')} />
                        <DynamicFormField control={control} label="Initial Drawdown" type="text" error={errors.initialDrawdown} {...register('initialDrawdown')} />
                    </div>
                </div>
            )
        },
        {
            label: "Configuration",
            hasError: tabFields["Configuration"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Reporting Structure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Reporting Structure" type="select" options={REPORTING_STRUCTURES} error={errors.reportingStructure} {...register('reportingStructure')} />
                        <DynamicFormField control={control} label="Comparison Reporting Structure" type="select" options={REPORTING_STRUCTURES} error={errors.comparisonReportingStructure} {...register('comparisonReportingStructure')} />
                    </div>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="SIP Option" type="checkbox" error={errors.sipOption} {...register('sipOption')} />
                        <DynamicFormField control={control} label="STP Option" type="checkbox" error={errors.stpOption} {...register('stpOption')} />
                        <DynamicFormField control={control} label="Topup Option" type="checkbox" error={errors.topupOption} {...register('topupOption')} />
                    </div>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Flags</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Is Distributable?" type="checkbox" error={errors.isDistributable} {...register('isDistributable')} />
                        <DynamicFormField control={control} label="Conservative" type="checkbox" error={errors.showInDashboard} {...register('showInDashboard')} />
                        <DynamicFormField control={control} label="Is Featured Product?" type="checkbox" error={errors.isFeatured} {...register('isFeatured')} />
                        <DynamicFormField control={control} label="Moderate?" type="checkbox" error={errors.isSuggested} {...register('isSuggested')} />
                        <DynamicFormField control={control} label="Aggressive?" type="checkbox" error={errors.isAggressive} {...register('isAggressive')} />
                        <DynamicFormField control={control} label="Is Open For Subscription?" type="checkbox" error={errors.isOpenForSubscription} {...register('isOpenForSubscription')} />
                        <DynamicFormField control={control} label="Is Active?" type="checkbox" error={errors.isActive} {...register('isActive')} />
                        <DynamicFormField control={control} label="Priority Order" type="number" error={errors.priorityOrder} {...register('priorityOrder')} />
                    </div>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Additional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Investor Type" type="select" options={INVESTOR_TYPES} error={errors.investorType} {...register('investorType')} />
                        <DynamicFormField control={control} label="Fund Type" type="select" options={FUND_TYPES} error={errors.fundType} {...register('fundType')} />
                        <DynamicFormField control={control} label="Scheme Type" type="select" options={SCHEME_TYPES} error={errors.schemeType} {...register('schemeType')} />
                        <DynamicFormField control={control} label="Currency" error={errors.currency} {...register('currency')} />
                    </div>
                </div>
            )
        },
        {
            label: "Advanced",
            hasError: tabFields["Advanced"].some(field => errors[field]),
            content: (
                <div className='space-y-6'>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Fund Approach & Tenure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Fund Approach" type="select" options={FUND_APPROACHES} error={errors.fundApproach} {...register('fundApproach')} />
                        <DynamicFormField control={control} label="Fund Approach Description" type="textarea" error={errors.fundApproachDescription} {...register('fundApproachDescription')} />
                        <DynamicFormField control={control} label="Fund Tenure" error={errors.fundTenure} {...register('fundTenure')} />
                        <DynamicFormField control={control} label="Fund Tenure Description" type="textarea" error={errors.fundTenureDescription} {...register('fundTenureDescription')} />
                    </div>

                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Fund Size & Commitments</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Fund Target Size" type="text" error={errors.fundTargetSize} {...register('fundTargetSize')} />
                        <DynamicFormField control={control} label="Fund Target Size Description" type="textarea" error={errors.fundTargetSizeDescription} {...register('fundTargetSizeDescription')} />
                        <DynamicFormField control={control} label="Min Commitment" type="text" error={errors.minCommitment} {...register('minCommitment')} />
                        <DynamicFormField control={control} label="Min Commitment Description" type="textarea" error={errors.minCommitmentDescription} {...register('minCommitmentDescription')} />
                        <DynamicFormField control={control} label="Drawdown" type="text" error={errors.drawdown} {...register('drawdown')} />
                        <DynamicFormField control={control} label="Drawdown Description" type="textarea" error={errors.drawdownDescription} {...register('drawdownDescription')} />
                        <DynamicFormField control={control} label="Targeted Gross IRR" type="text" error={errors.targettedGrossIrr} {...register('targettedGrossIrr')} />
                        <DynamicFormField control={control} label="Targeted Gross IRR Description" type="textarea" error={errors.targettedGrossIrrDescription} {...register('targettedGrossIrrDescription')} />
                    </div>
                </div>
            )
        },
        {
            label: "Policy & Legal",
            hasError: tabFields["Policy & Legal"].some(field => errors[field]),
            content: (
                <div className='space-y-6'>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Who Can Invest?" type="textarea" error={errors.whoCanInvest} {...register('whoCanInvest')} />
                        <DynamicFormField control={control} label="Who Cannot Invest?" type="textarea" error={errors.whoCannotInvest} {...register('whoCannotInvest')} />
                        <DynamicFormField control={control} label="Tentative Balance Commitment Call" type="textarea" error={errors.tentativeBalanceCommitmentCall} {...register('tentativeBalanceCommitmentCall')} />
                        <DynamicFormField control={control} label="Sponsor Commitment" type="textarea" error={errors.sponsorCommitment} {...register('sponsorCommitment')} />
                        <DynamicFormField control={control} label="Tentative Final Closing" type="textarea" error={errors.tentativeFinalClosing} {...register('tentativeFinalClosing')} />
                        <DynamicFormField control={control} label="Subscription And Redemption" type="textarea" error={errors.subscriptionAndRedemption} {...register('subscriptionAndRedemption')} />
                    </div>

                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Operational</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="NAV Frequency" error={errors.navFrequency} {...register('navFrequency')} />
                        <DynamicFormField control={control} label="Custody" error={errors.custody} {...register('custody')} />
                        <DynamicFormField control={control} label="Registrar And Transfer Agent" error={errors.registrarAndTransferAgent} {...register('registrarAndTransferAgent')} />
                        <DynamicFormField control={control} label="Trustee" error={errors.trustee} {...register('trustee')} />
                        <DynamicFormField control={control} label="Asset Structure" error={errors.assetStructure} {...register('assetStructure')} />
                        <DynamicFormField control={control} label="Legal Advisor" error={errors.legalAdvisor} {...register('legalAdvisor')} />
                        <DynamicFormField control={control} label="Tax Advisor" error={errors.taxAdvisor} {...register('taxAdvisor')} />
                        <DynamicFormField control={control} label="Taxation" type="textarea" error={errors.taxation} {...register('taxation')} />
                        <DynamicFormField control={control} label="Performance Note" type="textarea" error={errors.performanceNote} {...register('performanceNote')} />
                    </div>
                </div>
            )
        },
        {
            label: "Dynamic Fields",
            hasError: tabFields["Dynamic Fields"].some(field => errors[field]),
            content: (
                <div className='space-y-6'>
                    <div className="flex justify-between items-center space-x-2 border-b pb-2 mb-4">
                        <h3 className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary} pb-2`}>Fund Managers</h3>
                        <Button type="button" variant='outline' className='h-fit' onClick={() => appendFundManager({ fundManagerId: '', fromDate: '', isCurrent: true })} startIcon={<PlusIcon />}>
                            Add Fund Manager
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {fundManagerFields.map((field, index) => (
                            <div key={field.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-gray-800 relative">
                                <div className="absolute top-4 right-4">
                                    <button
                                        type="button"
                                        onClick={() => removeFundManager(index)}
                                        className="text-gray-500 hover:text-error-500 transition-colors"
                                        title="Remove Fund Manager"
                                    >
                                        <TrashBinIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pr-8">
                                    <DynamicFormField
                                        control={control}
                                        label="Fund Manager Name"
                                        type="select"
                                        options={fundManagerOptions}
                                        error={(errors.fundManagers as any)?.[index]?.fundManagerId}
                                        required
                                        {...register(`fundManagers.${index}.fundManagerId`)}
                                    />
                                    <DynamicFormField
                                        control={control}
                                        name={`fundManagers.${index}.fromDate`}
                                        label="From Date"
                                        type="date-picker"
                                        setValue={setValue}
                                        error={errors[`fundManagers.${index}.fromDate`]}
                                        value={watch(`fundManagers.${index}.fromDate`)}
                                    />
                                    <DynamicFormField
                                        control={control}
                                        name={`fundManagers.${index}.toDate`}
                                        label="To Date"
                                        type="date-picker"
                                        setValue={setValue}
                                        error={errors[`fundManagers.${index}.toDate`]}
                                        value={watch(`fundManagers.${index}.toDate`)}
                                    />

                                    <div className="flex items-center h-full pt-6">
                                        <DynamicFormField
                                            control={control}
                                            label="Still as Fund Manager?"
                                            type="checkbox"
                                            error={(errors.fundManagers as any)?.[index]?.isCurrent}
                                            {...register(`fundManagers.${index}.isCurrent`)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-between items-center space-x-2 border-b pb-2 mb-4">
                        <h3 className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary} pb-2`}>Top 5 Holdings</h3>
                        <Button type="button" variant='outline' className='h-fit' onClick={() => appendHolding({ name: '', value: 0 })} startIcon={<PlusIcon />}>
                            Add Holdings
                        </Button>
                    </div>

                    {/* <h3 className="text-md font-semibold border-b pb-2 mb-4 mt-6">Top 5 Holdings</h3> */}
                    <div className="space-y-4">
                        {holdingFields.map((field, index) => (
                            <div key={field.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-gray-800 relative">
                                <div className="absolute top-4 right-4">
                                    <button
                                        type="button"
                                        onClick={() => removeHolding(index)}
                                        className="text-gray-500 hover:text-error-500 transition-colors"
                                        title="Remove Holding"
                                    >
                                        <TrashBinIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                    <DynamicFormField
                                        control={control}
                                        label="Holding Name"
                                        required
                                        error={(errors.top5Holdings as any)?.[index]?.name}
                                        {...register(`top5Holdings.${index}.name`)}
                                    />
                                    <DynamicFormField
                                        control={control}
                                        label="Holding %"
                                        type="text"
                                        required
                                        error={(errors.top5Holdings as any)?.[index]?.value}
                                        {...register(`top5Holdings.${index}.value`)}
                                    />
                                </div>
                            </div>
                        ))}
                        {/* <Button type="button" onClick={() => appendHolding({ name: '', value: 0 })} startIcon={<PlusIcon />}>
                            Add Holding
                        </Button> */}
                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-between items-center space-x-2 border-b pb-2 mb-4">
                        <h3 className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary} pb-2`}>Top 5 Sectors</h3>
                        <Button type="button" variant='outline' className='h-fit' onClick={() => appendSector({ name: '', value: 0 })} startIcon={<PlusIcon />}>
                            Add Sectors
                        </Button>
                    </div>


                    {/* <h3 className="text-md font-semibold border-b pb-2 mb-4 mt-6">Top 5 Sectors</h3> */}
                    <div className="space-y-4">
                        {sectorFields.map((field, index) => (
                            <div key={field.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-gray-800 relative">
                                <div className="absolute top-4 right-4">
                                    <button
                                        type="button"
                                        onClick={() => removeSector(index)}
                                        className="text-gray-500 hover:text-error-500 transition-colors"
                                        title="Remove Sector"
                                    >
                                        <TrashBinIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                    <DynamicFormField
                                        control={control}
                                        label="Sector Name"
                                        required
                                        error={(errors.top5Sectors as any)?.[index]?.name}
                                        {...register(`top5Sectors.${index}.name`)}
                                    />
                                    <DynamicFormField
                                        control={control}
                                        label="Sector %"
                                        type="text"
                                        required
                                        error={(errors.top5Sectors as any)?.[index]?.value}
                                        {...register(`top5Sectors.${index}.value`)}
                                    />
                                </div>
                            </div>
                        ))}
                        {/* <Button type="button" onClick={() => appendSector({ name: '', value: 0 })} startIcon={<PlusIcon />}>
                            Add Sector
                        </Button> */}
                    </div>


                    <hr className="my-6" />

                    <div className="flex justify-between items-center space-x-2 border-b pb-2 mb-4">
                        <h3 className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary} pb-2`}>Performance</h3>
                        <Button type="button" variant='outline' className='h-fit' onClick={() => appendPerformance({ performanceType: '', year: '' })} startIcon={<PlusIcon />}>
                            Add Performance
                        </Button>
                    </div>

                    {/* <h3 className="text-md font-semibold border-b pb-2 mb-4 mt-6">Performance</h3> */}
                    <div className="space-y-4">
                        {performanceFields.map((field, index) => (
                            <div key={field.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-gray-800 relative">
                                <div className="absolute top-4 right-4">
                                    <button
                                        type="button"
                                        onClick={() => removePerformance(index)}
                                        className="text-gray-500 hover:text-error-500 transition-colors"
                                        title="Remove Performance"
                                    >
                                        <TrashBinIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-8">
                                    <DynamicFormField
                                        control={control}
                                        label="Performance Type"
                                        type="select"
                                        options={PERFORMANCE_TYPES}
                                        required
                                        error={(errors.performance as any)?.[index]?.performanceType}
                                        {...register(`performance.${index}.performanceType`)}
                                    />
                                    <DynamicFormField
                                        control={control}
                                        label="Year"
                                        required
                                        error={(errors.performance as any)?.[index]?.year}
                                        {...register(`performance.${index}.year`)}
                                    />
                                    <DynamicFormField
                                        control={control}
                                        label="Display"
                                        type="text"
                                        error={(errors.performance as any)?.[index]?.display}
                                        {...register(`performance.${index}.display`)}
                                    />
                                    <DynamicFormField
                                        control={control}
                                        label="Scheme Performance"
                                        type="number"
                                        step={0.01}
                                        min={-100}
                                        error={(errors.performance as any)?.[index]?.schemePerformance}
                                        {...register(`performance.${index}.schemePerformance`)}
                                    />
                                    <DynamicFormField
                                        control={control}
                                        label="Benchmark Performance"
                                        type="number"
                                        step={0.01}
                                        min={-100}
                                        error={(errors.performance as any)?.[index]?.benchmarkPerformance}
                                        {...register(`performance.${index}.benchmarkPerformance`)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            label: "Overall Performance",
            hasError: tabFields["Overall Performance"].some(field => errors[field]),
            content: (
                <div className="space-y-6">
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4`}>Overall Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(scheme?.overallPerformance || emptyValues.overallPerformance || {})
                            .filter(key => !['id', 'schemeId', 'createdAt', 'updatedAt'].includes(key))
                            .map(key => (
                                <DynamicFormField
                                    key={key}
                                    control={control}
                                    label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    type="number"
                                    step={0.000000001}
                                    min={-100}
                                    error={errors.overallPerformance?.[key as keyof SchemeSchemaType['overallPerformance']]}
                                    {...register(`overallPerformance.${key}`)}
                                />
                            ))}
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