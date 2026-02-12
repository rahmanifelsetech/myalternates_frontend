import { pgTable, uuid, varchar, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const investmentAccountSnapshot = pgTable('investment_account_snapshot', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentAccountId: uuid('investment_account_id'),
  snapshotVersion: integer('snapshot_version').default(1).notNull(),
  isLatest: boolean('is_latest').default(true).notNull(),
  snapshotReason: varchar('snapshot_reason', { length: 255 }),
  // Snapshot of investment_accounts fields
  modeOfHolding: varchar('mode_of_holding', { length: 50,
    enum: ['SINGLE', 'JOINT']
  }).notNull().default('SINGLE'),
  holderOrderSignature: varchar('holder_order_signature', { length: 255 }),
  dpType: varchar('dp_type', { length: 20 }),
  dpName: varchar('dp_name', { length: 100 }),
  dpId: varchar('dp_id', { length: 50 }),
  clientId: varchar('client_id', { length: 50 }),
  bankName: varchar('bank_name', { length: 100 }),
  bankAccount: varchar('bank_account', { length: 50 }),
  ifsc: varchar('ifsc', { length: 20 }),
  accountType: varchar('account_type', { length: 20 }),
  capturedAt: timestamp('captured_at').defaultNow(),
});
