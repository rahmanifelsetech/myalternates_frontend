import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { persons } from '../person/persons.schema';

export const kycDocuments = pgTable('kyc_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  personId: uuid('person_id').references(() => persons.id),
  documentType: varchar('document_type', { length: 50 }),
  fileUrl: text('file_url'),
  fileName: text('file_name'),
  fileSize: integer('file_size'),
  mimeType: text('mime_type'),
  status: varchar('status', { length: 30 }),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});

export const kycDocumentsRelations = relations(kycDocuments, ({ one }) => ({
  person: one(persons, {
    fields: [kycDocuments.personId],
    references: [persons.id],
  }),
}));