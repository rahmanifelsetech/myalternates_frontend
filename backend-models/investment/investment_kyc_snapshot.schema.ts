import { pgTable, uuid, varchar, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { kycDocuments } from './kyc_documents.schema';

export const investmentKycSnapshot = pgTable('investment_kyc_snapshot', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentId: uuid('investment_id'),
  personId: uuid('person_id'),
  snapshotVersion: integer('snapshot_version').default(1).notNull(),
  isLatest: boolean('is_latest').default(true).notNull(),
  snapshotReason: varchar('snapshot_reason', { length: 255 }),
  documentType: varchar('document_type', { length: 50 }),
  fileName: varchar('file_name', { length: 255 }),
  fileUrl: text('file_url'),
  fileSize: integer('file_size'),
  mimeType: varchar('mime_type', { length: 50 }),
  kycDocumentId: uuid('kyc_document_id').references(() => kycDocuments.id),
  capturedAt: timestamp('captured_at').defaultNow(),
});