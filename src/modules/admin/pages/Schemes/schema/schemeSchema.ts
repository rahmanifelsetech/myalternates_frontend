import * as z from 'zod';

const Top5ItemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    value: z.coerce.number().min(0, "Value must be non-negative"),
});

const SchemeFundManagerSchema = z.object({
    fundManagerId: z.string().uuid("Invalid Fund Manager ID"),
    fromDate: z.string().min(1, "From Date is required"),
    toDate: z.string().optional(),
    isCurrent: z.boolean().default(true),
});

const SchemePerformanceSchema = z.object({
    performanceType: z.string().min(1, "Performance Type is required"),
    year: z.string().min(1, "Year is required"),
    displayOrder: z.coerce.number().optional(),
    schemePerformance: z.coerce.number().optional(),
    benchmarkPerformance: z.coerce.number().optional(),
});

export const SchemeSchema = z.object({
    amcId: z.string().uuid("AMC is required"),
    productId: z.string().uuid("Product is required").optional().nullable(),
    schemeCode: z.string().min(1, 'Scheme Code is required'),
    schemeName: z.string().min(1, 'Scheme Name is required'),
    color: z.string().optional().nullable(), // Hex color code
    categoryId: z.string().uuid("Category is required").optional().nullable(),
    subCategoryId: z.string().uuid("Sub Category is required").optional().nullable(),
    assetClassId: z.string().uuid("Asset Class is required").optional().nullable(),
    benchmarkIndexId: z.string().uuid("Benchmark Index is required").optional().nullable(),
    benchmarkShortIndexId: z.string().uuid("Benchmark Short Index is required").optional().nullable(),

    iaStructure: z.string().optional().nullable(),
    iaCode: z.string().optional().nullable(),
    iaShortName: z.string().optional().nullable(),
    strategyCode: z.string().optional().nullable(),
    strategyName: z.string().optional().nullable(),

    aum: z.coerce.number().optional().nullable(),
    avgMarketCap: z.coerce.number().optional().nullable(),

    reportingStructure: z.string().optional().nullable(),
    comparisonReportingStructure: z.string().optional().nullable(),

    about: z.string().optional().nullable(),
    investmentObjective: z.string().optional().nullable(),
    investmentApproach: z.string().optional().nullable(),
    iaTheme: z.string().optional().nullable(),
    keyStrength: z.string().optional().nullable(),
    schemeInceptionDate: z.string().optional().nullable(),

    setupFees: z.coerce.number().optional().nullable(),
    largeCap: z.coerce.number().optional().nullable(),
    midCap: z.coerce.number().optional().nullable(),
    smallCap: z.coerce.number().optional().nullable(),
    cashEquivalent: z.coerce.number().optional().nullable(),
    others: z.coerce.number().optional().nullable(),

    sipOption: z.boolean().optional().nullable(),
    stpOption: z.boolean().optional().nullable(),
    topupOption: z.boolean().optional().nullable(),

    feeProfitShare: z.coerce.number().optional().nullable(),
    feeStructure: z.string().optional().nullable(),
    feeFixedAmc: z.coerce.number().optional().nullable(),
    feeVariableAmc: z.coerce.number().optional().nullable(),
    feeHurdle: z.coerce.number().optional().nullable(),
    remarksForFeeStructure: z.string().optional().nullable(),

    exitLoad1Yr: z.coerce.number().optional().nullable(),
    exitLoad2Yr: z.coerce.number().optional().nullable(),
    exitLoad3Yr: z.coerce.number().optional().nullable(),
    exitLoad: z.string().optional().nullable(),
    exitOption: z.string().optional().nullable(),

    idealStocksInPortfolio: z.coerce.number().optional().nullable(),
    minInvestment: z.coerce.number().optional().nullable(),
    minTopupAmount: z.coerce.number().optional().nullable(),
    initialDrawdown: z.coerce.number().optional().nullable(),

    isDistributable: z.boolean().optional().nullable(),
    showInDashboard: z.boolean().optional().nullable(),
    isFeatured: z.boolean().default(false),
    isSuggested: z.boolean().optional().nullable(),
    isOpenForSubscription: z.boolean().optional().nullable(),
    priorityOrder: z.coerce.number().optional().nullable(),
    isActive: z.boolean().default(true),

    investorType: z.string().optional().nullable(),
    fundType: z.string().optional().nullable(),
    schemeType: z.string().optional().nullable(),
    currency: z.string().optional().nullable(),

    fundApproach: z.string().optional().nullable(),
    fundApproachDescription: z.string().optional().nullable(),
    fundTenure: z.string().optional().nullable(),
    fundTenureDescription: z.string().optional().nullable(),
    fundTargetSize: z.coerce.number().optional().nullable(),
    fundTargetSizeDescription: z.string().optional().nullable(),
    minCommitment: z.coerce.number().optional().nullable(),
    minCommitmentDescription: z.string().optional().nullable(),
    drawdown: z.coerce.number().optional().nullable(),
    drawdownDescription: z.string().optional().nullable(),
    targettedGrossIrr: z.coerce.number().optional().nullable(),
    targettedGrossIrrDescription: z.string().optional().nullable(),

    whoCanInvest: z.string().optional().nullable(),
    whoCannotInvest: z.string().optional().nullable(),
    tentativeBalanceCommitmentCall: z.string().optional().nullable(),
    sponsorCommitment: z.string().optional().nullable(),
    tentativeFinalClosing: z.string().optional().nullable(),
    subscriptionAndRedemption: z.string().optional().nullable(),

    navFrequency: z.string().optional().nullable(),
    custody: z.string().optional().nullable(),
    registrarAndTransferAgent: z.string().optional().nullable(),
    trustee: z.string().optional().nullable(),
    assetStructure: z.string().optional().nullable(),
    legalAdvisor: z.string().optional().nullable(),
    taxAdvisor: z.string().optional().nullable(),
    taxation: z.string().optional().nullable(),
    performanceNote: z.string().optional().nullable(),

    top5Holdings: z.array(Top5ItemSchema).optional().nullable(),
    top5Sectors: z.array(Top5ItemSchema).optional().nullable(),

    fundManagers: z.array(SchemeFundManagerSchema).optional(),
    performance: z.array(SchemePerformanceSchema).optional(),
});

export type SchemeSchemaType = z.infer<typeof SchemeSchema>;