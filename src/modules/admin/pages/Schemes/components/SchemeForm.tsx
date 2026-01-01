import React, { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useForm } from '@shared/hooks/useForm';
import { SchemeSchema, SchemeSchemaType } from '../schema/schemeSchema';
import { Scheme } from '../types/scheme';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import ComponentCard from '@shared/components/common/ComponentCard';
import { setFormErrors } from '@shared/utils/setFormErrors';
import {
    useGetAmcListQuery,
    useGetAssetClassListQuery,
    useGetBenchmarkIndexListQuery,
    useGetCategoryListQuery,
    useGetFundManagerListQuery,
} from '../api/schemeApi';
import { PlusIcon, TrashBinIcon } from '@shared/icons';

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
    const {
        control,
        handleSubmit,
        reset,
        setError,
        watch,
    } = useForm(SchemeSchema, scheme ? {
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
            aum: scheme.aum ?? null,
            avgMarketCap: scheme.avgMarketCap ?? null,
            reportingStructure: scheme.reportingStructure ?? null,
            comparisonReportingStructure: scheme.comparisonReportingStructure ?? null,
            about: scheme.about ?? null,
            investmentObjective: scheme.investmentObjective ?? null,
            investmentApproach: scheme.investmentApproach ?? null,
            iaTheme: scheme.iaTheme ?? null,
            keyStrength: scheme.keyStrength ?? null,
            schemeInceptionDate: scheme.schemeInceptionDate ?? null,
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
            idealStocksInPortfolio: scheme.idealStocksInPortfolio ?? null,
            minInvestment: scheme.minInvestment ?? null,
            minTopupAmount: scheme.minTopupAmount ?? null,
            initialDrawdown: scheme.initialDrawdown ?? null,
            isDistributable: scheme.isDistributable ?? null,
            showInDashboard: scheme.showInDashboard ?? null,
            isSuggested: scheme.isSuggested ?? null,
            isOpenForSubscription: scheme.isOpenForSubscription ?? null,
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
            top5Holdings: scheme.top5Holdings ?? [],
            top5Sectors: scheme.top5Sectors ?? [],
            fundManagers: scheme.fundManagers ?? [],
            performance: scheme.performance ?? [],
        } as SchemeSchemaType : { ...emptyValues },
    );

    const { data: amcList } = useGetAmcListQuery();
    const { data: categoryList } = useGetCategoryListQuery();
    const { data: assetClassList } = useGetAssetClassListQuery();
    const { data: benchmarkIndexList } = useGetBenchmarkIndexListQuery();
    const { data: fundManagerList } = useGetFundManagerListQuery();

    const amcOptions = amcList?.data?.map((amc: any) => ({ label: amc.name, value: amc.id })) || [];
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
        if (scheme) {
            reset({
                ...scheme,
                amcId: scheme.amcId ?? '',
                productId: scheme.productId ?? '',
                schemeCode: scheme.schemeCode ?? '',
                schemeName: scheme.schemeName ?? '',
                color: scheme.color ?? '',
                categoryId: scheme.categoryId ?? '',
                subCategoryId: scheme.subCategoryId ?? '',
                assetClassId: scheme.assetClassId ?? '',
                benchmarkIndexId: scheme.benchmarkIndexId ?? '',
                benchmarkShortIndexId: scheme.benchmarkShortIndexId ?? '',
                iaStructure: scheme.iaStructure ?? '',
                iaCode: scheme.iaCode ?? '',
                iaShortName: scheme.iaShortName ?? '',
                strategyCode: scheme.strategyCode ?? '',
                strategyName: scheme.strategyName ?? '',
                aum: scheme.aum ?? 0,
                avgMarketCap: scheme.avgMarketCap ?? 0,
                reportingStructure: scheme.reportingStructure ?? '',
                comparisonReportingStructure: scheme.comparisonReportingStructure ?? '',
                about: scheme.about ?? '',
                investmentObjective: scheme.investmentObjective ?? '',
                investmentApproach: scheme.investmentApproach ?? '',
                iaTheme: scheme.iaTheme ?? '',
                keyStrength: scheme.keyStrength ?? '',
                schemeInceptionDate: scheme.schemeInceptionDate ?? '',
                setupFees: scheme.setupFees ?? 0,
                largeCap: scheme.largeCap ?? 0,
                midCap: scheme.midCap ?? 0,
                smallCap: scheme.smallCap ?? 0,
                cashEquivalent: scheme.cashEquivalent ?? 0,
                others: scheme.others ?? 0,
                sipOption: scheme.sipOption ?? false,
                stpOption: scheme.stpOption ?? false,
                topupOption: scheme.topupOption ?? false,
                feeProfitShare: scheme.feeProfitShare ?? 0,
                feeStructure: scheme.feeStructure ?? '',
                feeFixedAmc: scheme.feeFixedAmc ?? 0,
                feeVariableAmc: scheme.feeVariableAmc ?? 0,
                feeHurdle: scheme.feeHurdle ?? 0,
                remarksForFeeStructure: scheme.remarksForFeeStructure ?? '',
                exitLoad1Yr: scheme.exitLoad1Yr ?? 0,
                exitLoad2Yr: scheme.exitLoad2Yr ?? 0,
                exitLoad3Yr: scheme.exitLoad3Yr ?? 0,
                exitLoad: scheme.exitLoad ?? '',
                exitOption: scheme.exitOption ?? '',
                idealStocksInPortfolio: scheme.idealStocksInPortfolio ?? 0,
                minInvestment: scheme.minInvestment ?? 0,
                minTopupAmount: scheme.minTopupAmount ?? 0,
                initialDrawdown: scheme.initialDrawdown ?? 0,
                isDistributable: scheme.isDistributable ?? false,
                showInDashboard: scheme.showInDashboard ?? false,
                isSuggested: scheme.isSuggested ?? false,
                isOpenForSubscription: scheme.isOpenForSubscription ?? false,
                investorType: scheme.investorType ?? '',
                fundType: scheme.fundType ?? '',
                schemeType: scheme.schemeType ?? '',
                currency: scheme.currency ?? '',
                fundApproach: scheme.fundApproach ?? '',
                fundApproachDescription: scheme.fundApproachDescription ?? '',
                fundTenure: scheme.fundTenure ?? '',
                fundTenureDescription: scheme.fundTenureDescription ?? '',
                fundTargetSize: scheme.fundTargetSize ?? 0,
                fundTargetSizeDescription: scheme.fundTargetSizeDescription ?? '',
                minCommitment: scheme.minCommitment ?? 0,
                minCommitmentDescription: scheme.minCommitmentDescription ?? '',
                drawdown: scheme.drawdown ?? 0,
                drawdownDescription: scheme.drawdownDescription ?? '',
                targettedGrossIrr: scheme.targettedGrossIrr ?? 0,
                targettedGrossIrrDescription: scheme.targettedGrossIrrDescription ?? '',
                whoCanInvest: scheme.whoCanInvest ?? '',
                whoCannotInvest: scheme.whoCannotInvest ?? '',
                tentativeBalanceCommitmentCall: scheme.tentativeBalanceCommitmentCall ?? '',
                sponsorCommitment: scheme.sponsorCommitment ?? '',
                tentativeFinalClosing: scheme.tentativeFinalClosing ?? '',
                subscriptionAndRedemption: scheme.subscriptionAndRedemption ?? '',
                navFrequency: scheme.navFrequency ?? '',
                custody: scheme.custody ?? '',
                registrarAndTransferAgent: scheme.registrarAndTransferAgent ?? '',
                trustee: scheme.trustee ?? '',
                assetStructure: scheme.assetStructure ?? '',
                legalAdvisor: scheme.legalAdvisor ?? '',
                taxAdvisor: scheme.taxAdvisor ?? '',
                taxation: scheme.taxation ?? '',
                performanceNote: scheme.performanceNote ?? '',
                top5Holdings: scheme.top5Holdings ?? [],
                top5Sectors: scheme.top5Sectors ?? [],
                fundManagers: scheme.fundManagers ?? [],
                performance: scheme.performance ?? [],
            });
        } else {
            reset(emptyValues);
        }
    }, [scheme, reset]);

    const handleFormSubmit = async (data: SchemeSchemaType) => {
        try {
            await onSubmit(data);
        } catch (error: any) {
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


    return (
        <ComponentCard>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="space-y-6">
                    {/* Basic Details */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Basic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="amcId" label="AMC" type="select" options={amcOptions} required />
                        <DynamicFormField control={control} name="productId" label="Product" type="select" options={[]} /> {/* Products TBD */}
                        <DynamicFormField control={control} name="schemeCode" label="Scheme Code" required />
                        <DynamicFormField control={control} name="schemeName" label="Scheme Name" required />
                        <DynamicFormField control={control} name="color" label="Color" />
                        <DynamicFormField control={control} name="categoryId" label="Category" type="select" options={categoryOptions} />
                        <DynamicFormField control={control} name="subCategoryId" label="Comparison Category" type="select" options={categoryOptions} /> {/* Assuming Comparison Category uses the same list */}
                        <DynamicFormField control={control} name="assetClassId" label="Asset Class" type="select" options={assetClassOptions} />
                        <DynamicFormField control={control} name="benchmarkIndexId" label="Benchmark Index" type="select" options={benchmarkOptions} />
                        <DynamicFormField control={control} name="benchmarkShortIndexId" label="Benchmark Short Index" type="select" options={benchmarkOptions} />
                    </div>

                    {/* Investment Approach (IA) Fields */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Investment Approach</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="iaStructure" label="IA Structure" type="select" options={iaStructures} />
                        <DynamicFormField control={control} name="iaCode" label="IA Code" />
                        <DynamicFormField control={control} name="iaShortName" label="IA Short Name" />
                        <DynamicFormField control={control} name="strategyName" label="Strategy Name" />
                    </div>

                    {/* Financials */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Financials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="aum" label="AUM" type="number" />
                        <DynamicFormField control={control} name="avgMarketCap" label="Avg. Market Cap" type="number" />
                    </div>

                    {/* Reporting */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Reporting Structure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="reportingStructure" label="Reporting Structure" type="select" options={reportingStructures} />
                        <DynamicFormField control={control} name="comparisonReportingStructure" label="Comparison Reporting Structure" type="select" options={reportingStructures} />
                    </div>

                    {/* Details */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Scheme Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="about" label="About Scheme" type="textarea" />
                        <DynamicFormField control={control} name="investmentObjective" label="Investment Objective" type="textarea" />
                        <DynamicFormField control={control} name="investmentApproach" label="Investment Approach" type="textarea" />
                        <DynamicFormField control={control} name="iaTheme" label="IA Theme" />
                        <DynamicFormField control={control} name="keyStrength" label="Key Strength of Portfolio" />
                        <DynamicFormField control={control} name="schemeInceptionDate" label="Scheme Inception Date" type="date" />
                    </div>

                    {/* Fees & Portfolio Composition */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Fees & Portfolio Composition</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="setupFees" label="Setup Fees" type="number" />
                        <DynamicFormField control={control} name="largeCap" label="Large Cap" type="number" />
                        <DynamicFormField control={control} name="midCap" label="Mid Cap" type="number" />
                        <DynamicFormField control={control} name="smallCap" label="Small Cap" type="number" />
                        <DynamicFormField control={control} name="cashEquivalent" label="Cash Equivalent" type="number" />
                        <DynamicFormField control={control} name="others" label="Others" type="number" />
                    </div>

                    {/* Options */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="sipOption" label="SIP Option" type="checkbox" />
                        <DynamicFormField control={control} name="stpOption" label="STP Option" type="checkbox" />
                        <DynamicFormField control={control} name="topupOption" label="Topup Option" type="checkbox" />
                    </div>

                    {/* Fee Structure */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Fee Structure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="feeProfitShare" label="Fee Profit Share" type="number" />
                        <DynamicFormField control={control} name="feeStructure" label="Fee Structure" type="select" options={feeStructures} />
                        <DynamicFormField control={control} name="feeFixedAmc" label="Fee Fixed AMC" type="number" />
                        <DynamicFormField control={control} name="feeVariableAmc" label="Fee Variable AMC" type="number" />
                        <DynamicFormField control={control} name="feeHurdle" label="Fee Hurdle" type="number" />
                        <DynamicFormField control={control} name="remarksForFeeStructure" label="Remarks for Fee Structure" type="textarea" />
                    </div>

                    {/* Exit Loads */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Exit Loads</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="exitLoad1Yr" label="Exit Load 1 Yr" type="number" />
                        <DynamicFormField control={control} name="exitLoad2Yr" label="Exit Load 2 Yr" type="number" />
                        <DynamicFormField control={control} name="exitLoad3Yr" label="Exit Load 3 Yr" type="number" />
                        <DynamicFormField control={control} name="exitLoad" label="Exit Load" />
                        <DynamicFormField control={control} name="exitOption" label="Exit Option" />
                    </div>

                    {/* Portfolio Const */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Portfolio Construction</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="idealStocksInPortfolio" label="Ideal Stocks In Portfolio" type="number" />
                        <DynamicFormField control={control} name="minInvestment" label="Min Investment" type="number" />
                        <DynamicFormField control={control} name="minTopupAmount" label="Min Topup Amount" type="number" />
                        <DynamicFormField control={control} name="initialDrawdown" label="Initial Drawdown" type="number" />
                    </div>

                    {/* Flags */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Flags</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="isDistributable" label="Is Distributable?" type="checkbox" />
                        <DynamicFormField control={control} name="showInDashboard" label="Show In Dashboard?" type="checkbox" />
                        <DynamicFormField control={control} name="isFeatured" label="Is Featured Product?" type="checkbox" />
                        <DynamicFormField control={control} name="isSuggested" label="Is Suggested?" type="checkbox" />
                        <DynamicFormField control={control} name="isOpenForSubscription" label="Is Open For Subscription?" type="checkbox" />
                        <DynamicFormField control={control} name="priorityOrder" label="Priority Order" type="number" />
                    </div>

                    {/* Additional Details */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Additional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="investorType" label="Investor Type" type="select" options={investorTypes} />
                        <DynamicFormField control={control} name="fundType" label="Fund Type" type="select" options={fundTypes} />
                        <DynamicFormField control={control} name="schemeType" label="Scheme Type" type="select" options={schemeTypes} />
                        <DynamicFormField control={control} name="currency" label="Currency" />
                    </div>

                    {/* Fund Approach & Tenure */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Fund Approach & Tenure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="fundApproach" label="Fund Approach" type="select" options={fundApproaches} />
                        <DynamicFormField control={control} name="fundApproachDescription" label="Fund Approach Description" type="textarea" />
                        <DynamicFormField control={control} name="fundTenure" label="Fund Tenure" />
                        <DynamicFormField control={control} name="fundTenureDescription" label="Fund Tenure Description" type="textarea" />
                    </div>

                    {/* Fund Size & Commitments */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Fund Size & Commitments</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="fundTargetSize" label="Fund Target Size" type="number" />
                        <DynamicFormField control={control} name="fundTargetSizeDescription" label="Fund Target Size Description" type="textarea" />
                        <DynamicFormField control={control} name="minCommitment" label="Min Commitment" type="number" />
                        <DynamicFormField control={control} name="minCommitmentDescription" label="Min Commitment Description" type="textarea" />
                        <DynamicFormField control={control} name="drawdown" label="Drawdown" type="number" />
                        <DynamicFormField control={control} name="drawdownDescription" label="Drawdown Description" type="textarea" />
                        <DynamicFormField control={control} name="targettedGrossIrr" label="Targeted Gross IRR" type="number" />
                        <DynamicFormField control={control} name="targettedGrossIrrDescription" label="Targeted Gross IRR Description" type="textarea" />
                    </div>

                    {/* Policy */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="whoCanInvest" label="Who Can Invest?" type="textarea" />
                        <DynamicFormField control={control} name="whoCannotInvest" label="Who Cannot Invest?" type="textarea" />
                        <DynamicFormField control={control} name="tentativeBalanceCommitmentCall" label="Tentative Balance Commitment Call" type="textarea" />
                        <DynamicFormField control={control} name="sponsorCommitment" label="Sponsor Commitment" type="textarea" />
                        <DynamicFormField control={control} name="tentativeFinalClosing" label="Tentative Final Closing" type="textarea" />
                        <DynamicFormField control={control} name="subscriptionAndRedemption" label="Subscription And Redemption" type="textarea" />
                    </div>

                    {/* Operational */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Operational</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DynamicFormField control={control} name="navFrequency" label="NAV Frequency" />
                        <DynamicFormField control={control} name="custody" label="Custody" />
                        <DynamicFormField control={control} name="registrarAndTransferAgent" label="Registrar And Transfer Agent" />
                        <DynamicFormField control={control} name="trustee" label="Trustee" />
                        <DynamicFormField control={control} name="assetStructure" label="Asset Structure" />
                        <DynamicFormField control={control} name="legalAdvisor" label="Legal Advisor" />
                        <DynamicFormField control={control} name="taxAdvisor" label="Tax Advisor" />
                        <DynamicFormField control={control} name="taxation" label="Taxation" type="textarea" />
                        <DynamicFormField control={control} name="performanceNote" label="Performance Note" type="textarea" />
                    </div>

                    {/* Fund Managers */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Fund Managers</h3>
                    <div>
                        {fundManagerFields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                                <DynamicFormField
                                    control={control}
                                    name={`fundManagers.${index}.fundManagerId`}
                                    label="Fund Manager Name"
                                    type="select"
                                    options={fundManagerOptions}
                                    required
                                />
                                <DynamicFormField
                                    control={control}
                                    name={`fundManagers.${index}.fromDate`}
                                    label="Fund Manager From"
                                    type="date"
                                    required
                                />
                                <DynamicFormField
                                    control={control}
                                    name={`fundManagers.${index}.toDate`}
                                    label="Fund Manager Until?"
                                    type="date"
                                />
                                <DynamicFormField
                                    control={control}
                                    name={`fundManagers.${index}.isCurrent`}
                                    label="Still as Fund Manager?"
                                    type="checkbox"
                                />
                                <Button
                                    type="button"
                                    onClick={() => removeFundManager(index)}
                                    variant="outline"
                                    startIcon={<TrashBinIcon />}
                                    className="md:col-span-1 text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={() => appendFundManager({ fundManagerId: '', fromDate: '', isCurrent: true })} startIcon={<PlusIcon />}>
                            Add Fund Manager
                        </Button>
                    </div>

                    {/* Top 5 Holdings */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Top 5 Holdings</h3>
                    <div>
                        {holdingFields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
                                <DynamicFormField
                                    control={control}
                                    name={`top5Holdings.${index}.name`}
                                    label="Holding Name"
                                    required
                                />
                                <DynamicFormField
                                    control={control}
                                    name={`top5Holdings.${index}.value`}
                                    label="Holding %"
                                    type="number"
                                    required
                                />
                                <Button
                                    type="button"
                                    onClick={() => removeHolding(index)}
                                    variant="outline"
                                    startIcon={<TrashBinIcon />}
                                    className="md:col-span-1 text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={() => appendHolding({ name: '', value: 0 })} startIcon={<PlusIcon />}>
                            Add Holding
                        </Button>
                    </div>

                    {/* Top 5 Sectors */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Top 5 Sectors</h3>
                    <div>
                        {sectorFields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
                                <DynamicFormField
                                    control={control}
                                    name={`top5Sectors.${index}.name`}
                                    label="Sector Name"
                                    required
                                />
                                <DynamicFormField
                                    control={control}
                                    name={`top5Sectors.${index}.value`}
                                    label="Sector %"
                                    type="number"
                                    required
                                />
                                <Button
                                    type="button"
                                    onClick={() => removeSector(index)}
                                    variant="outline"
                                    startIcon={<TrashBinIcon />}
                                    className="md:col-span-1 text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={() => appendSector({ name: '', value: 0 })} startIcon={<PlusIcon />}>
                            Add Sector
                        </Button>
                    </div>

                    {/* Performance */}
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4 mt-6">Performance</h3>
                    <div>
                        {performanceFields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-end">
                                <DynamicFormField
                                    control={control}
                                    name={`performance.${index}.performanceType`}
                                    label="Performance Type"
                                    type="select"
                                    options={performanceTypes}
                                    required
                                />
                                <DynamicFormField
                                    control={control}
                                    name={`performance.${index}.year`}
                                    label="Year"
                                    required
                                />
                                <DynamicFormField
                                    control={control}
                                    name={`performance.${index}.displayOrder`}
                                    label="Display Order"
                                    type="number"
                                />
                                <DynamicFormField
                                    control={control}
                                    name={`performance.${index}.schemePerformance`}
                                    label="Scheme Performance"
                                    type="number"
                                />
                                <DynamicFormField
                                    control={control}
                                    name={`performance.${index}.benchmarkPerformance`}
                                    label="Benchmark Performance"
                                    type="number"
                                />
                                <Button
                                    type="button"
                                    onClick={() => removePerformance(index)}
                                    variant="outline"
                                    startIcon={<TrashBinIcon />}
                                    className="md:col-span-1 text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={() => appendPerformance({ performanceType: '', year: '' })} startIcon={<PlusIcon />}>
                            Add Performance
                        </Button>
                    </div>

                </div>

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