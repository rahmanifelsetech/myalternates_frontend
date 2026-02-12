import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { investmentAccounts } from './investment_accounts.schema';

export const dematAccounts = pgTable('demat_accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentAccountId: uuid('investment_account_id').references(() => investmentAccounts.id),
  dpType: varchar('dp_type', { length: 10, enum: ['NSDL', 'CDSL'] }).notNull(),
  dpName: varchar('dp_name', { length: 100 }),
  dpId: varchar('dp_id', { length: 50 }),
  clientId: varchar('client_id', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const dematAccountsRelations = relations(dematAccounts, ({ one }) => ({
  investmentAccount: one(investmentAccounts, {
    fields: [dematAccounts.investmentAccountId],
    references: [investmentAccounts.id],
  }),
}));
