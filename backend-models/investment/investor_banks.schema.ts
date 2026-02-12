import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { investmentAccounts } from './investment_accounts.schema';

export const investorBanks = pgTable('investor_banks', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentAccountId: uuid('investment_account_id').references(() => investmentAccounts.id),
  bankName: varchar('bank_name', { length: 100 }).notNull(),
  accountNumber: varchar('account_number', { length: 50 }).notNull(),
  ifsc: varchar('ifsc', { length: 20 }).notNull(),
  accountType: varchar('account_type', { length: 20 }).notNull(),
  isActive: boolean('is_active').default(true),
  is_primary: boolean('is_primary').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const investorBanksRelations = relations(investorBanks, ({ one }) => ({
  investmentAccount: one(investmentAccounts, {
    fields: [investorBanks.investmentAccountId],
    references: [investmentAccounts.id],
  }),
}));
