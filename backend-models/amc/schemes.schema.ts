import { pgTable, uuid, varchar, text, date, integer, boolean, timestamp, numeric, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { amcs } from './amc.schema';
import { products } from '../master/products.schema';
import { categories } from '../master/categories.schema';
import { asset_classes } from '../master/asset_classes.schema';
import { benchmark_indices } from '../master/benchmark_indices.schema';
import { scheme_fund_managers } from './scheme_fund_managers.schema';
import { scheme_performance } from './scheme_performance.schema';
import { scheme_overall_performance } from './scheme_overall_performance.schema';

export const schemes = pgTable('schemes', {
    id: uuid("id").defaultRandom().primaryKey(),
    amcId: uuid("amc_id").notNull().references(() => amcs.id, { onDelete: "cascade" }),
    productId: uuid('product_id').references(() => products.id),
    schemeCode: varchar("scheme_code", { length: 20 }).notNull().unique(),
    schemeName: varchar("scheme_name", { length: 255 }).notNull(),
    amcCat: varchar("amc_cat", { length: 50 }),
    color: varchar('color', { length: 7 }), // Hex color code
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
    subCategoryId: uuid("sub_category_id").references(() => categories.id, { onDelete: "set null" }),
    
    // New Dropdowns (References)
    assetClassId: uuid("asset_class_id").references(() => asset_classes.id),
    benchmarkIndexId: uuid("benchmark_index_id").references(() => benchmark_indices.id),
    benchmarkShortIndexId: uuid("benchmark_short_index_id").references(() => benchmark_indices.id),

    // IA Fields
    iaStructure: varchar("ia_structure", { length: 255 }), // scheme_type
    // iaCode: varchar("ia_code", { length: 50 }), // scheme_code
    iaShortName: varchar("ia_short_name", { length: 100 }), // scheme_short_name
    // strategyCode: varchar("strategy_code", { length: 50 }),
    // strategyName: varchar("strategy_name", { length: 255 }), // scheme_name
    
    // Financials
    aum: varchar("aum"),
    avgMarketCap: numeric("avg_market_cap"),
    
    // Reporting
    reportingStructure: varchar("reporting_structure", { length: 100 }),
    comparisonReportingStructure: varchar("comparison_reporting_structure", { length: 100 }),
    
    // Details
    about: text("about"),
    investmentObjective: text("investment_objective"),
    investmentApproach: text("investment_approach"),
    iaTheme: varchar("ia_theme", { length: 255 }),
    keyStrength: text("key_strength"),
    schemeInceptionDate: date("scheme_inception_date"),
    
    // Fees & Portfolio Composition
    setupFees: varchar("setup_fees"),
    largeCap: varchar("large_cap", { length: 255 }),
    midCap: varchar("mid_cap", { length: 255 }),
    smallCap: varchar("small_cap", { length: 255 }),
    cashEquivalent: numeric("cash_equivalent"),
    others: numeric("others"),
    
    // Options
    sipOption: boolean("sip_option").default(false),
    stpOption: boolean("stp_option").default(false),
    topupOption: boolean("topup_option").default(false),
    
    // Fee Structure
    feeProfitShare: varchar("fee_profit_share", { length: 100 }),
    feeStructure: text("fee_structure"),
    feeFixedAmc: varchar("fee_fixed_amc", { length: 100 }),
    feeVariableAmc: varchar("fee_variable_amc", { length: 100 }),
    feeHurdle: varchar("fee_hurdle", { length: 100 }),
    remarksForFeeStructure: text("remarks_for_fee_structure"),
    
    // Exit Loads
    exitLoad1Yr: varchar("exit_load_1_yr", { length: 100 }),
    exitLoad2Yr: varchar("exit_load_2_yr", { length: 100 }),
    exitLoad3Yr: varchar("exit_load_3_yr", { length: 100 }),
    exitLoad: text("exit_load"),
    exitOption: text("exit_option"),
    
    // Portfolio Const
    idealStocksInPortfolio: integer("ideal_stocks_in_portfolio"),
    minInvestment: varchar("min_investment"),
    minTopupAmount: varchar("min_topup_amount"),
    initialDrawdown: varchar("initial_drawdown"),
    
    // Flags
    isDistributable: boolean("is_distributable").default(false),
    conservative: boolean("conservative").default(false),
    isFeatured: boolean('is_featured').default(false).notNull(), // Existing field mapped to IsFeaturedProduct
    moderate: boolean("moderate").default(false),
    isAggressive: boolean("is_aggressive").default(false),
    isOpenForSubscription: boolean("is_open_for_subscription").default(true),
    display: text('display'),
    priorityOrder: integer('priority_order').default(0).notNull(),
    
    // Additional Details
    investorType: varchar("investor_type", { length: 50 }),
    fundType: varchar("fund_type", { length: 50 }),
    schemeType: varchar("scheme_type", { length: 50 }),
    currency: varchar("currency", { length: 10 }),
    
    // Fund Approach & Tenure
    fundApproach: varchar("fund_approach", { length: 50 }),
    fundApproachDescription: text("fund_approach_description"),
    fundTenure: varchar("fund_tenure", { length: 50 }),
    fundTenureDescription: text("fund_tenure_description"),
    
    // Fund Size & Commitments
    fundTargetSize: numeric("fund_target_size"),
    fundTargetSizeDescription: text("fund_target_size_description"),
    minCommitment: numeric("min_commitment"),
    minCommitmentDescription: text("min_commitment_description"),
    drawdown: varchar("drawdown"),
    drawdownDescription: text("drawdown_description"),
    targettedGrossIrr: numeric("targetted_gross_irr"),
    targettedGrossIrrDescription: text("targetted_gross_irr_description"),
    
    // Policy
    whoCanInvest: text("who_can_invest"),
    whoCannotInvest: text("who_cannot_invest"),
    tentativeBalanceCommitmentCall: text("tentative_balance_commitment_call"),
    sponsorCommitment: text("sponsor_commitment"),
    tentativeFinalClosing: text("tentative_final_closing"),
    subscriptionAndRedemption: text("subscription_and_redemption"),
    
    // Operational
    navFrequency: varchar("nav_frequency", { length: 50 }),
    custody: varchar("custody", { length: 255 }),
    registrarAndTransferAgent: varchar("registrar_and_transfer_agent", { length: 255 }),
    trustee: varchar("trustee", { length: 255 }),
    assetStructure: varchar("asset_structure", { length: 255 }),
    legalAdvisor: varchar("legal_advisor", { length: 255 }),
    taxAdvisor: varchar("tax_advisor", { length: 255 }),
    taxation: text("taxation"),
    performanceNote: text("performance_note"),

    // JSON Fields for Top 5 (Since requirements said Input Name / Input %)
    top5Holdings: json("top_5_holdings"), // { name: string, value: number }[]
    top5Sectors: json("top_5_sectors"), // { name: string, value: number }[]

    // finalycaSchemeId: varchar("finalyca_scheme_id"),
    // Standard Fields
    tenureInMonths: integer("tenure_in_months"),
    riskLevel: varchar("risk_level", { length: 255 }),
    isActive: boolean('is_active').default(true).notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const schemesRelations = relations(schemes, ({ one, many }) => ({
    amc: one(amcs, {
        fields: [schemes.amcId],
        references: [amcs.id],
    }),
    product: one(products, {
        fields: [schemes.productId],
        references: [products.id],
    }),
    category: one(categories, {
        fields: [schemes.categoryId],
        references: [categories.id],
    }),
    subCategory: one(categories, {
        fields: [schemes.subCategoryId],
        references: [categories.id],
    }),
    assetClass: one(asset_classes, {
        fields: [schemes.assetClassId],
        references: [asset_classes.id],
    }),
    benchmarkIndex: one(benchmark_indices, {
        fields: [schemes.benchmarkIndexId],
        references: [benchmark_indices.id],
    }),
    benchmarkShortIndex: one(benchmark_indices, {
        fields: [schemes.benchmarkShortIndexId],
        references: [benchmark_indices.id],
    }),
    fundManagers: many(scheme_fund_managers),
    performance: many(scheme_performance),
    overallPerformance: one(scheme_overall_performance, {
        fields: [schemes.id],
        references: [scheme_overall_performance.schemeId],
    }),
}));

export type Scheme = typeof schemes;