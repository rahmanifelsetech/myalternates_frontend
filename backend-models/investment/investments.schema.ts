import { pgTable, uuid, varchar, numeric, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { investmentAccounts } from './investment_accounts.schema';
import { investmentHolders } from './investment_holders.schema';
import { investmentNominees } from './investment_nominees.schema';
import { investmentDrawdowns } from './investment_drawdowns.schema';

export const investments = pgTable('investments', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentAccountId: uuid('investment_account_id').references(() => investmentAccounts.id),
  productId: uuid('product_id'),
  schemeId: uuid('scheme_id'),
  product: varchar('product', { length: 100 }),
  amcClientCode: varchar('amc_client_code', { length: 50 }),
  strategyCode: varchar('strategy_code', { length: 50 }),
  strategyName: varchar('strategy_name', { length: 100 }),
  fmCode: varchar('fm_code', { length: 50 }),
  branchCode: varchar('branch_code', { length: 50 }),
  amcSharing: varchar('amc_sharing'),
  feeStructure: text('fee_structure'),
  remarks: text('remarks'),
  distributorId: uuid('distributor_id'),
  creId: uuid('cre_id'),
  rmId: uuid('rm_id'),
  status: varchar('status', { length: 30 }).default('ACTIVE'),
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