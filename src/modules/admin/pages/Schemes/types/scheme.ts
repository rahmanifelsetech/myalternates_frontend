import { PaginatedResponse, SingleResponse } from "@shared/types/api";

export interface Scheme {
    id: string;
    amcId: string;
    productId: string;
    amc: { id: string, name: string };
    product: { id: string, name: string } | null;
    schemeCode: string;
    schemeName: string;
    color: string | null;
    categoryId: string | null;
    subCategoryId: string | null;
    assetClassId: string | null;
    category: { id: string, name: string } | null;
    subCategory: { id: string, name: string } | null;
    assetClass: { id: string, name: string } | null;
    benchmarkIndexId: string | null;
    benchmarkShortIndexId: string | null;
    iaStructure: string | null;
    iaCode: string | null;
    iaShortName: string | null;
    strategyCode: string | null;
    strategyName: string | null;
    aum: string | null;
    avgMarketCap: string | null;
    reportingStructure: string | null;
    comparisonReportingStructure: string | null;
    about: string | null;
    investmentObjective: string | null;
    investmentApproach: string | null;
    iaTheme: string | null;
    keyStrength: string | null;
    schemeInceptionDate: string | null;
    setupFees: string | null;
    largeCap: string | null;
    midCap: string | null;
    smallCap: string | null;
    cashEquivalent: string | null;
    others: string | null;
    sipOption: boolean | null;
    stpOption: boolean | null;
    topupOption: boolean | null;
    feeProfitShare: string | null;
    feeStructure: string | null;
    feeFixedAmc: string | null;
    feeVariableAmc: string | null;
    feeHurdle: string | null;
    remarksForFeeStructure: string | null;
    exitLoad1Yr: string | null;
    exitLoad2Yr: string | null;
    exitLoad3Yr: string | null;
    exitLoad: string | null;
    exitOption: string | null;
    idealStocksInPortfolio: number | null;
    minInvestment: string | null;
    minTopupAmount: string | null;
    initialDrawdown: string | null;
    isDistributable: boolean | null;
    showInDashboard: boolean | null;
    isFeatured: boolean;
    isSuggested: boolean | null;
    isOpenForSubscription: boolean | null;
    priorityOrder: number;
    investorType: string | null;
    fundType: string | null;
    schemeType: string | null;
    currency: string | null;
    fundApproach: string | null;
    fundApproachDescription: string | null;
    fundTenure: string | null;
    fundTenureDescription: string | null;
    fundTargetSize: string | null;
    fundTargetSizeDescription: string | null;
    minCommitment: string | null;
    minCommitmentDescription: string | null;
    drawdown: string | null;
    drawdownDescription: string | null;
    targettedGrossIrr: string | null;
    targettedGrossIrrDescription: string | null;
    whoCanInvest: string | null;
    whoCannotInvest: string | null;
    tentativeBalanceCommitmentCall: string | null;
    sponsorCommitment: string | null;
    tentativeFinalClosing: string | null;
    subscriptionAndRedemption: string | null;
    navFrequency: string | null;
    custody: string | null;
    registrarAndTransferAgent: string | null;
    trustee: string | null;
    assetStructure: string | null;
    legalAdvisor: string | null;
    taxAdvisor: string | null;
    taxation: string | null;
    performanceNote: string | null;
    top5Holdings: Array<{ name: string, value: string }> | null;
    top5Sectors: Array<{ name: string, value: string }> | null;
    fundManagers?: Array<SchemeFundManager>; // Added fundManagers
    performance?: Array<SchemePerformance>; // Added performance
    tenureInMonths: number | null;
    riskLevel: string | null;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export type SchemeListResponse = PaginatedResponse<Scheme>;
export type SchemeResponse = SingleResponse<Scheme>;

export interface CreateSchemePayload {
    amcId: string;
    productId?: string;
    schemeCode: string;
    schemeName: string;
    color?: string;
    categoryId?: string;
    subCategoryId?: string;
    assetClassId?: string;
    benchmarkIndexId?: string;
    benchmarkShortIndexId?: string;
    iaStructure?: string;
    iaCode?: string;
    iaShortName?: string;
    strategyCode?: string;
    strategyName?: string;
    aum?: number;
    avgMarketCap?: number;
    reportingStructure?: string;
    comparisonReportingStructure?: string;
    about?: string;
    investmentObjective?: string;
    investmentApproach?: string;
    iaTheme?: string;
    keyStrength?: string;
    schemeInceptionDate?: string;
    setupFees?: number;
    largeCap?: number;
    midCap?: number;
    smallCap?: number;
    cashEquivalent?: number;
    others?: number;
    sipOption?: boolean;
    stpOption?: boolean;
    topupOption?: boolean;
    feeProfitShare?: number;
    feeStructure?: string;
    feeFixedAmc?: number;
    feeVariableAmc?: number;
    feeHurdle?: number;
    remarksForFeeStructure?: string;
    exitLoad1Yr?: number;
    exitLoad2Yr?: number;
    exitLoad3Yr?: number;
    exitLoad?: string;
    exitOption?: string;
    idealStocksInPortfolio?: number;
    minInvestment?: number;
    minTopupAmount?: number;
    initialDrawdown?: number;
    isDistributable?: boolean;
    showInDashboard?: boolean;
    isFeatured?: boolean;
    isSuggested?: boolean;
    isOpenForSubscription?: boolean;
    priorityOrder?: number;
    isActive?: boolean;
    investorType?: string;
    fundType?: string;
    schemeType?: string;
    currency?: string;
    fundApproach?: string;
    fundApproachDescription?: string;
    fundTenure?: string;
    fundTenureDescription?: string;
    fundTargetSize?: number;
    fundTargetSizeDescription?: string;
    minCommitment?: number;
    minCommitmentDescription?: string;
    drawdown?: number;
    drawdownDescription?: string;
    targettedGrossIrr?: number;
    targettedGrossIrrDescription?: string;
    whoCanInvest?: string;
    whoCannotInvest?: string;
    tentativeBalanceCommitmentCall?: string;
    sponsorCommitment?: string;
    tentativeFinalClosing?: string;
    subscriptionAndRedemption?: string;
    navFrequency?: string;
    custody?: string;
    registrarAndTransferAgent?: string;
    trustee?: string;
    assetStructure?: string;
    legalAdvisor?: string;
    taxAdvisor?: string;
    taxation?: string;
    performanceNote?: string;
    top5Holdings?: Array<{ name: string, value: string }>;
    top5Sectors?: Array<{ name: string, value: string }>;
    tenureInMonths?: number;
    riskLevel?: string;
}

export interface UpdateSchemePayload extends Partial<CreateSchemePayload> {
    id: string;
}

export interface SchemeFilters {
    search?: string;
    page?: number;
    limit?: number;
    amcId?: string;
}

export interface FundManager {
    id: string;
    name: string;
}

export interface SchemeFundManager {
    fundManagerId: string;
    fromDate: string;
    toDate?: string;
    isCurrent: boolean;
}

export interface SchemePerformance {
    performanceType: string;
    year: string;
    display?: string;
    schemePerformance?: number;
    benchmarkPerformance?: number;
}
