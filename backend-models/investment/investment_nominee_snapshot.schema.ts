import { pgTable, uuid, varchar, numeric, timestamp, jsonb, date, integer, boolean } from 'drizzle-orm/pg-core';

export const investmentNomineeSnapshot = pgTable('investment_nominee_snapshot', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentId: uuid('investment_id'),
  personId: uuid('person_id'),
  snapshotVersion: integer('snapshot_version').default(1).notNull(),
  isLatest: boolean('is_latest').default(true).notNull(),

  // Person data snapshot
  nameSnapshot: varchar('name_snapshot', { length: 255 }),
  panSnapshot: varchar('pan_snapshot', { length: 10 }),
  dobSnapshot: date('dob_snapshot'),
  genderSnapshot: varchar('gender_snapshot', { length: 20 }),
  mobileSnapshot: varchar('mobile_snapshot', { length: 20 }),
  emailSnapshot: varchar('email_snapshot', { length: 255 }),
  addressSnapshot: jsonb('address_snapshot'),

  // Nominee specific data snapshot
  relationship: varchar('relationship', { length: 100 }),
  percentage: numeric('percentage', { precision: 5, scale: 2 }),
  idType: varchar('id_type', { length: 30 }),
  idNumber: varchar('id_number', { length: 50 }),

  capturedAt: timestamp('captured_at').defaultNow(),
});