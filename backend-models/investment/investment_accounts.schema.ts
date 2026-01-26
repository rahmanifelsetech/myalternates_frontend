import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { customers } from './customers.schema';
import { investorBanks } from './investor_banks.schema';
import { investments } from './investments.schema';

export const investmentAccounts = pgTable('investment_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').references(() => customers.id),
  bankId: uuid('bank_id').references(() => investorBanks.id),
  modeOfHolding: varchar('mode_of_holding', { length: 50 }),
  dpType: varchar('dp_type', { length: 20 }),
  dpName: varchar('dp_name', { length: 100 }),
  dpId: varchar('dp_id', { length: 50 }),
  clientId: varchar('client_id', { length: 50 }),
  
  // Snapshot fields for compliance
  bankName: varchar('bank_name', { length: 100 }),
  bankAccount: varchar('bank_account', { length: 50 }),
  ifsc: varchar('ifsc', { length: 20 }),
  accountType: varchar('account_type', { length: 20 }),

  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const investmentAccountsRelations = relations(investmentAccounts, ({ one, many }) => ({
  customer: one(customers, {
    fields: [investmentAccounts.customerId],
    references: [customers.id],
  }),
  bank: one(investorBanks, {
    fields: [investmentAccounts.bankId],
    references: [investorBanks.id],
  }),
  investments: many(investments),
}));