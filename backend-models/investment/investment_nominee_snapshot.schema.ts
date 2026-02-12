import { pgTable, uuid, varchar, numeric, timestamp, jsonb, date, integer, boolean } from 'drizzle-orm/pg-core';

export const investmentNomineeSnapshot = pgTable('investment_nominee_snapshot', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentId: uuid('investment_id'),
  personId: uuid('person_id'),
  snapshotVersion: integer('snapshot_version').default(1).notNull(),
  isLatest: boolean('is_latest').default(true).notNull(),
  snapshotReason: varchar('snapshot_reason', { length: 255 }),

  // Person data snapshot
  name: varchar('name', { length: 255 }),
  pan: varchar('pan', { length: 10 }),
  dob: date('dob', { mode: 'string' }),
  gender: varchar('gender', { length: 20 }),
  mobile: varchar('mobile', { length: 20 }),
  email: varchar('email', { length: 255 }),
  address: jsonb('address'),

  // Nominee specific data snapshot
  relationship: varchar('relationship', { length: 100 }),
  percentage: numeric('percentage', { precision: 5, scale: 2 }),
  idType: varchar('id_type', { length: 30 }),
  idNumber: varchar('id_number', { length: 50 }),

  // Guardian specific data snapshot
  isMinor: boolean('is_minor').default(false),
  guardianName: varchar('guardian_name', { length: 100 }),
  guardianIdType: varchar('guardian_id_type', { length: 50 }),
  guardianIdNumber: varchar('guardian_id_number', { length: 50 }),
  guardianRelationship: varchar('guardian_relationship', { length: 100 }),

  capturedAt: timestamp('captured_at').defaultNow(),
});