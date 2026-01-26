import { pgTable, text, uuid, varchar, date, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { personAddresses } from './person_addresses.schema';
import { kycDocuments } from '../investment/kyc_documents.schema';

export const persons = pgTable('persons', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  pan: varchar('pan', { length: 10 }),
  dob: date('dob'),
  gender: varchar('gender', { length: 20 }),
  mobile: varchar('mobile', { length: 20 }),
  email: varchar('email', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const personsRelations = relations(persons, ({ many }) => ({
  addresses: many(personAddresses),
  kycDocuments: many(kycDocuments),
}));