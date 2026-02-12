import { pgTable, uuid, varchar, numeric, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { investmentAccounts, products, schemes, amcs, distributors, users, fund_managers, investmentHolders, investmentNominees, investmentDrawdowns } from '@infrastructure/schemas';

export const investments = pgTable('investments', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentAccountId: uuid('investment_account_id').references(() => investmentAccounts.id),
  productId: uuid('product_id').references(() => products.id),
  schemeId: uuid('scheme_id').references(() => schemes.id),
  branchCode: varchar('branch_code', { length: 50 }),
  amcSharing: varchar('amc_sharing'),
  feeStructure: text('fee_structure'),
  fixedFee: varchar('fixed_fee'),
  variableFee: varchar('variable_fee'),
  performanceFee: varchar('performance_fee'),
  hurdleFee: varchar('hurdle_fee'),
  drawdownNo: varchar('drawdown_no'),
  remarks: text('remarks'),
  capitalCommitment: numeric('capital_commitment', { precision: 20, scale: 2 }),
  commitmentCurrency: varchar('commitment_currency', { length: 10 }),
  amcId: uuid('amc_id').references(() => amcs.id),
  amcClientCode: varchar('amc_client_code', { length: 50 }).unique(),
  distributorId: uuid('distributor_id').references(() => distributors.id),
  creId: uuid('cre_id').references(() => users.id),
  rmId: uuid('rm_id').references(() => users.id),
  fmId: uuid('fm_id').references(() => fund_managers.id),
  status: varchar('status', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const investmentsRelations = relations(investments, ({ one, many }) => ({
  investmentAccount: one(investmentAccounts, {
    fields: [investments.investmentAccountId],
    references: [investmentAccounts.id],
  }),
  holders: many(investmentHolders),
  nominees: many(investmentNominees),
  drawdowns: many(investmentDrawdowns),
}));
