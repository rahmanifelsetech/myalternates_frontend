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
    iaCode: null,
    iaShortName: null,
    strategyCode: null,
    strategyName: null,
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
        iaCode: scheme.iaCode ?? null,
        iaShortName: scheme.iaShortName ?? null,
        strategyCode: scheme.strategyCode ?? null,
        strategyName: scheme.strategyName ?? null,
        aum: scheme.aum ? parseFloat(scheme.aum as any) : null,
        avgMarketCap: scheme.avgMarketCap ? parseFloat(scheme.avgMarketCap as any) : null,
        reportingStructure: scheme.reportingStructure ?? null,
        comparisonReportingStructure: scheme.comparisonReportingStructure ?? null,
        about: scheme.about ?? null,
        investmentObjective: scheme.investmentObjective ?? null,
        investmentApproach: scheme.investmentApproach ?? null,
        iaTheme: scheme.iaTheme ?? null,
        keyStrength: scheme.keyStrength ?? null,
        schemeInceptionDate: scheme.schemeInceptionDate ? formatDate(scheme.schemeInceptionDate) : null,
        setupFees: scheme.setupFees ? parseFloat(scheme.setupFees as any) : null,
        largeCap: scheme.largeCap ? parseFloat(scheme.largeCap as any) : null,
        midCap: scheme.midCap ? parseFloat(scheme.midCap as any) : null,
        smallCap: scheme.smallCap ? parseFloat(scheme.smallCap as any) : null,
        cashEquivalent: scheme.cashEquivalent ? parseFloat(scheme.cashEquivalent as any) : null,
        others: scheme.others ? parseFloat(scheme.others as any) : null,
        sipOption: scheme.sipOption ?? null,
        stpOption: scheme.stpOption ?? null,
        topupOption: scheme.topupOption ?? null,
        feeProfitShare: scheme.feeProfitShare ? parseFloat(scheme.feeProfitShare as any) : null,
        feeStructure: scheme.feeStructure ?? null,
        feeFixedAmc: scheme.feeFixedAmc ? parseFloat(scheme.feeFixedAmc as any) : null,
        feeVariableAmc: scheme.feeVariableAmc ? parseFloat(scheme.feeVariableAmc as any) : null,
        feeHurdle: scheme.feeHurdle ? parseFloat(scheme.feeHurdle as any) : null,
        remarksForFeeStructure: scheme.remarksForFeeStructure ?? null,
        exitLoad1Yr: scheme.exitLoad1Yr ? parseFloat(scheme.exitLoad1Yr as any) : null,
        exitLoad2Yr: scheme.exitLoad2Yr ? parseFloat(scheme.exitLoad2Yr as any) : null,
        exitLoad3Yr: scheme.exitLoad3Yr ? parseFloat(scheme.exitLoad3Yr as any) : null,
        exitLoad: scheme.exitLoad ?? null,
        exitOption: scheme.exitOption ?? null,
        idealStocksInPortfolio: scheme.idealStocksInPortfolio ? parseInt(scheme.idealStocksInPortfolio as any, 10) : null,
        minInvestment: scheme.minInvestment ? parseFloat(scheme.minInvestment as any) : null,
        minTopupAmount: scheme.minTopupAmount ? parseFloat(scheme.minTopupAmount as any) : null,
        initialDrawdown: scheme.initialDrawdown ? parseFloat(scheme.initialDrawdown as any) : null,
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
        fundTargetSize: scheme.fundTargetSize ? parseFloat(scheme.fundTargetSize as any) : null,
        fundTargetSizeDescription: scheme.fundTargetSizeDescription ?? null,
        minCommitment: scheme.minCommitment ? parseFloat(scheme.minCommitment as any) : null,
        minCommitmentDescription: scheme.minCommitmentDescription ?? null,
        drawdown: scheme.drawdown ? parseFloat(scheme.drawdown as any) : null,
        drawdownDescription: scheme.drawdownDescription ?? null,
        targettedGrossIrr: scheme.targettedGrossIrr ? parseFloat(scheme.targettedGrossIrr as any) : null,
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
        top5Holdings: scheme.top5Holdings ? scheme.top5Holdings.map(h => ({ ...h, value: parseFloat(h.value as any) })) : [],
        top5Sectors: scheme.top5Sectors ? scheme.top5Sectors.map(s => ({ ...s, value: parseFloat(s.value as any) })) : [],
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

    const amcOptions = amcList?.data?.map((amc: any) => ({ label: amc.name, value: amc.id })) || [];
    const productOptions = productList?.data?.map((product: any) => ({ label: product.name, value: product.id })) || [];
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
    });

    const {
        fields: holdingFields,
        append: appendHolding,
        remove: removeHolding,
    } = useFieldArray({
        control,
        name: 'top5Holdings',
    });

    const {
        fields: sectorFields,
        append: appendSector,
        remove: removeSector,
    } = useFieldArray({
        control,
        name: 'top5Sectors',
    });

    const {
        fields: performanceFields,
        append: appendPerformance,
        remove: removePerformance,
    } = useFieldArray({
        control,
        name: 'performance',
    });

    useEffect(() => {
        reset(initialValues);
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
            setFormErrors(error, setError);
        }
    };

    const iaStructures = [
        { label: "Open Ended", value: "Open Ended" },
        { label: "Close Ended", value: "Close Ended" },
    ];

    const reportingStructures = [
        { label: "AGGREGATE PORTFOLIO", value: "AGGREGATE PORTFOLIO" },
        { label: "MODEL PORTFOLIO", value: "MODEL PORTFOLIO" },
        { label: "INITIAL CLIENT PORTFOLIO", value: "INITIAL CLIENT PORTFOLIO" },
        { label: "INDEX", value: "INDEX" },
        { label: "TWRR (Pooled Portfolio Basis)", value: "TWRR (Pooled Portfolio Basis)" },
        { label: "TWRR (Model Portfolio Basis)", value: "TWRR (Model Portfolio Basis)" },
        { label: "OTHERS", value: "OTHERS" },
        { label: "XIRR Aggregated", value: "XIRR Aggregated" },
        { label: "TWRR Pooled", value: "TWRR Pooled" },
    ];

    const feeStructures = [
        { label: "Post Fees Reporting", value: "Post Fees Reporting" },
        { label: "Pre Fees Reporting", value: "Pre Fees Reporting" },
    ];

    const investorTypes = [
        { label: "All", value: "All" },
        { label: "Indian & Non - US", value: "Indian& Non - US" },
        { label: "ALL NRI", value: "ALL NRI" },
        { label: "Non US", value: "Non US" },
    ];

    const fundTypes = [
        { label: "India Focused Fund", value: "India Focused Fund" },
        { label: "Global Focused Fund", value: "Global Focused Fund" },
    ];

    const schemeTypes = [
        { label: "Restricted Scheme (Non-retail)", value: "Restricted Scheme(Non-retail)" },
    ];

    const fundApproaches = [
        { label: "Feeder Fund", value: "Feeder Fund" },
        { label: "Active Fund", value: "Active Fund" },
    ];

    const performanceTypes = [
        { label: "Financial Year Performance", value: "Financial Year Performance" },
        { label: "Calendar Year Performance", value: "Calendar Year Performance" },
    ];


    const [activeTab, setActiveTab] = useState(0);

    const tabFields: Record<string, (keyof SchemeSchemaType)[]> = {
        "Basic Details": ['productId', 'amcId', 'schemeCode', 'schemeName', 'color', 'categoryId', 'subCategoryId', 'assetClassId', 'benchmarkIndexId', 'benchmarkShortIndexId'],
        "Details": ['iaStructure', 'iaCode', 'iaShortName', 'strategyName', 'about', 'investmentObjective', 'investmentApproach', 'iaTheme', 'keyStrength', 'schemeInceptionDate'],
        "Financials": ['aum', 'avgMarketCap', 'setupFees', 'largeCap', 'midCap', 'smallCap', 'cashEquivalent', 'others'],
        "Fees & Loads": ['feeProfitShare', 'feeStructure', 'feeFixedAmc', 'feeVariableAmc', 'feeHurdle', 'remarksForFeeStructure', 'exitLoad1Yr', 'exitLoad2Yr', 'exitLoad3Yr', 'exitLoad', 'exitOption'],
        "Portfolio": ['idealStocksInPortfolio', 'minInvestment', 'minTopupAmount', 'initialDrawdown'],
        "Configuration": ['reportingStructure', 'comparisonReportingStructure', 'sipOption', 'stpOption', 'topupOption', 'isDistributable', 'showInDashboard', 'isFeatured', 'isSuggested', 'isOpenForSubscription', 'priorityOrder', 'investorType', 'fundType', 'schemeType', 'currency'],
        "Advanced": ['fundApproach', 'fundApproachDescription', 'fundTenure', 'fundTenureDescription', 'fundTargetSize', 'fundTargetSizeDescription', 'minCommitment', 'minCommitmentDescription', 'drawdown', 'drawdownDescription', 'targettedGrossIrr', 'targettedGrossIrrDescription'],
        "Policy & Legal": ['whoCanInvest', 'whoCannotInvest', 'tentativeBalanceCommitmentCall', 'sponsorCommitment', 'tentativeFinalClosing', 'subscriptionAndRedemption', 'navFrequency', 'custody', 'registrarAndTransferAgent', 'trustee', 'assetStructure', 'legalAdvisor', 'taxAdvisor', 'taxation', 'performanceNote'],
        "Dynamic Fields": ['fundManagers', 'top5Holdings', 'top5Sectors', 'performance'],
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
                        <DynamicFormField control={control} label="IA Structure" type="select" options={iaStructures} error={errors.iaStructure} {...register('iaStructure')} />
                        <DynamicFormField control={control} label="IA Code" error={errors.iaCode} {...register('iaCode')} />
                        <DynamicFormField control={control} label="IA Short Name" error={errors.iaShortName} {...register('iaShortName')} />
                        <DynamicFormField control={control} label="Strategy Name" error={errors.strategyName} {...register('strategyName')} />
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
                        <DynamicFormField control={control} label="AUM" type="number" error={errors.aum} {...register('aum')} />
                        <DynamicFormField control={control} label="Avg. Market Cap" type="number" error={errors.avgMarketCap} {...register('avgMarketCap')} />
                    </div>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Fees & Portfolio Composition</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Setup Fees" type="number" error={errors.setupFees} {...register('setupFees')} />
                        <DynamicFormField control={control} label="Large Cap" type="number" error={errors.largeCap} {...register('largeCap')} />
                        <DynamicFormField control={control} label="Mid Cap" type="number" error={errors.midCap} {...register('midCap')} />
                        <DynamicFormField control={control} label="Small Cap" type="number" error={errors.smallCap} {...register('smallCap')} />
                        <DynamicFormField control={control} label="Cash Equivalent" type="number" error={errors.cashEquivalent} {...register('cashEquivalent')} />
                        <DynamicFormField control={control} label="Others" type="number" error={errors.others} {...register('others')} />
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
                        <DynamicFormField control={control} label="Fee Profit Share" type="number" error={errors.feeProfitShare} {...register('feeProfitShare')} />
                        <DynamicFormField control={control} label="Fee Structure" type="select" options={feeStructures} error={errors.feeStructure} {...register('feeStructure')} />
                        <DynamicFormField control={control} label="Fee Fixed AMC" type="number" error={errors.feeFixedAmc} {...register('feeFixedAmc')} />
                        <DynamicFormField control={control} label="Fee Variable AMC" type="number" error={errors.feeVariableAmc} {...register('feeVariableAmc')} />
                        <DynamicFormField control={control} label="Fee Hurdle" type="number" error={errors.feeHurdle} {...register('feeHurdle')} />
                        <DynamicFormField control={control} label="Remarks for Fee Structure" type="textarea" error={errors.remarksForFeeStructure} {...register('remarksForFeeStructure')} />
                    </div>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Exit Loads</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Exit Load 1 Yr" type="number" error={errors.exitLoad1Yr} {...register('exitLoad1Yr')} />
                        <DynamicFormField control={control} label="Exit Load 2 Yr" type="number" error={errors.exitLoad2Yr} {...register('exitLoad2Yr')} />
                        <DynamicFormField control={control} label="Exit Load 3 Yr" type="number" error={errors.exitLoad3Yr} {...register('exitLoad3Yr')} />
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
                        <DynamicFormField control={control} label="Min Investment" type="number" error={errors.minInvestment} {...register('minInvestment')} />
                        <DynamicFormField control={control} label="Min Topup Amount" type="number" error={errors.minTopupAmount} {...register('minTopupAmount')} />
                        <DynamicFormField control={control} label="Initial Drawdown" type="number" error={errors.initialDrawdown} {...register('initialDrawdown')} />
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
                        <DynamicFormField control={control} label="Reporting Structure" type="select" options={reportingStructures} error={errors.reportingStructure} {...register('reportingStructure')} />
                        <DynamicFormField control={control} label="Comparison Reporting Structure" type="select" options={reportingStructures} error={errors.comparisonReportingStructure} {...register('comparisonReportingStructure')} />
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
                        <DynamicFormField control={control} label="Show In Dashboard?" type="checkbox" error={errors.showInDashboard} {...register('showInDashboard')} />
                        <DynamicFormField control={control} label="Is Featured Product?" type="checkbox" error={errors.isFeatured} {...register('isFeatured')} />
                        <DynamicFormField control={control} label="Is Suggested?" type="checkbox" error={errors.isSuggested} {...register('isSuggested')} />
                        <DynamicFormField control={control} label="Is Open For Subscription?" type="checkbox" error={errors.isOpenForSubscription} {...register('isOpenForSubscription')} />
                        <DynamicFormField control={control} label="Is Active?" type="checkbox" error={errors.isActive} {...register('isActive')} />
                        <DynamicFormField control={control} label="Priority Order" type="number" error={errors.priorityOrder} {...register('priorityOrder')} />
                    </div>
                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Additional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Investor Type" type="select" options={investorTypes} error={errors.investorType} {...register('investorType')} />
                        <DynamicFormField control={control} label="Fund Type" type="select" options={fundTypes} error={errors.fundType} {...register('fundType')} />
                        <DynamicFormField control={control} label="Scheme Type" type="select" options={schemeTypes} error={errors.schemeType} {...register('schemeType')} />
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
                        <DynamicFormField control={control} label="Fund Approach" type="select" options={fundApproaches} error={errors.fundApproach} {...register('fundApproach')} />
                        <DynamicFormField control={control} label="Fund Approach Description" type="textarea" error={errors.fundApproachDescription} {...register('fundApproachDescription')} />
                        <DynamicFormField control={control} label="Fund Tenure" error={errors.fundTenure} {...register('fundTenure')} />
                        <DynamicFormField control={control} label="Fund Tenure Description" type="textarea" error={errors.fundTenureDescription} {...register('fundTenureDescription')} />
                    </div>

                    <h3 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary} border-b pb-2 mb-4 mt-6`}>Fund Size & Commitments</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} label="Fund Target Size" type="number" error={errors.fundTargetSize} {...register('fundTargetSize')} />
                        <DynamicFormField control={control} label="Fund Target Size Description" type="textarea" error={errors.fundTargetSizeDescription} {...register('fundTargetSizeDescription')} />
                        <DynamicFormField control={control} label="Min Commitment" type="number" error={errors.minCommitment} {...register('minCommitment')} />
                        <DynamicFormField control={control} label="Min Commitment Description" type="textarea" error={errors.minCommitmentDescription} {...register('minCommitmentDescription')} />
                        <DynamicFormField control={control} label="Drawdown" type="number" error={errors.drawdown} {...register('drawdown')} />
                        <DynamicFormField control={control} label="Drawdown Description" type="textarea" error={errors.drawdownDescription} {...register('drawdownDescription')} />
                        <DynamicFormField control={control} label="Targeted Gross IRR" type="number" error={errors.targettedGrossIrr} {...register('targettedGrossIrr')} />
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
                                        type="number"
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
                                        type="number"
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
                                        options={performanceTypes}
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
                                        label="Display Order"
                                        type="number"
                                        error={(errors.performance as any)?.[index]?.displayOrder}
                                        {...register(`performance.${index}.displayOrder`)}
                                    />
                                    <DynamicFormField
                                        control={control}
                                        label="Scheme Performance"
                                        type="number"
                                        error={(errors.performance as any)?.[index]?.schemePerformance}
                                        {...register(`performance.${index}.schemePerformance`)}
                                    />
                                    <DynamicFormField
                                        control={control}
                                        label="Benchmark Performance"
                                        type="number"
                                        error={(errors.performance as any)?.[index]?.benchmarkPerformance}
                                        {...register(`performance.${index}.benchmarkPerformance`)}
                                    />
                                </div>
                            </div>
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