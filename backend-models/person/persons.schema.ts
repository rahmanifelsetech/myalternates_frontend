import { pgTable, text, uuid, varchar, date, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { personAddresses } from './person_addresses.schema';
import { kycDocuments } from '../investment/kyc_documents.schema';

export const persons = pgTable('persons', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  pan: varchar('pan', { length: 10 }).unique(),
  dob: date('dob', { mode: 'string' }),
  gender: varchar('gender', { length: 20 }),
  mobile: varchar('mobile', { length: 20 }),
  email: varchar('email', { length: 255 }),
  isMinor: boolean('is_minor').default(false),
  guardianName: varchar('guardian_name', { length: 100 }),
  guardianIdType: varchar('guardian_id_type', { length: 50 }),
  guardianIdNumber: varchar('guardian_id_number', { length: 50 }),
  guardianRelationship: varchar('guardian_relationship', { length: 100 }),
  // guardianPersonId: uuid('guardian_person_id'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => [
  index('idx_person_pan').on(table.pan),
])

export const personsRelations = relations(persons, ({ many }) => ({
  addresses: many(personAddresses),
  kycDocuments: many(kycDocuments),
}));