import { pgTable, uuid, varchar, boolean, timestamp, unique, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { investors } from './investors.schema';

export const investmentAccounts = pgTable('investment_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  investorId: uuid('investor_id').references(() => investors.id),
  modeOfHolding: varchar('mode_of_holding', {
    enum: ['SINGLE', 'JOINT']
  }).notNull().default('SINGLE'),
  holderOrderSignature: varchar('holder_order_signature', { length: 255 }),
  isActive: boolean('is_active').default(true),
  
  // Portfolio tracking
  totalInvested: numeric('total_invested', { precision: 20, scale: 2 }).default('0'), // Sum of all transactions
  currentPortfolioValue: numeric('current_portfolio_value', { precision: 20, scale: 2 }).default('0'), // Latest valuation
  
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    unique_investor_holding_signature: unique('unique_investor_holding_signature').on(table.investorId, table.modeOfHolding, table.holderOrderSignature),
  };
});

export const investmentAccountsRelations = relations(investmentAccounts, ({ one }) => ({
  investor: one(investors, {
    fields: [investmentAccounts.investorId],
    references: [investors.id],
  }),
}));
