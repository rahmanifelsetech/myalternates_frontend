import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { distributors } from './distributors.schema';

export const distributorBanks = pgTable('distributor_banks', {
  id: uuid('id').primaryKey().defaultRandom(),
  distributorId: uuid('distributor_id').references(() => distributors.id),
  bankName: varchar('bank_name', { length: 100 }).notNull(),
  accountNumber: varchar('account_number', { length: 50 }).notNull(),
  ifsc: varchar('ifsc', { length: 20 }).notNull(),
  micr: varchar('micr', { length: 20 }),
  accountName: varchar('account_name', { length: 100 }),
  accountType: varchar('account_type', { length: 20 }).notNull(),
  isPrimary: boolean('is_primary').default(false),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const distributorBanksRelations = relations(distributorBanks, ({ one }) => ({
  distributor: one(distributors, {
    fields: [distributorBanks.distributorId],
    references: [distributors.id],
  }),
}));