import { pgTable, uuid, varchar, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const investmentKycSnapshot = pgTable('investment_kyc_snapshot', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentId: uuid('investment_id'),
  personId: uuid('person_id'),
  snapshotVersion: integer('snapshot_version').default(1).notNull(),
  isLatest: boolean('is_latest').default(true).notNull(),
  documentType: varchar('document_type', { length: 50 }),
  fileUrl: text('file_url'),
  capturedAt: timestamp('captured_at').defaultNow(),
});