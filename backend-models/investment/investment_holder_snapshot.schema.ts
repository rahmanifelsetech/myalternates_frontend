import { pgTable, uuid, varchar, date, jsonb, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const investmentHolderSnapshot = pgTable('investment_holder_snapshot', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentId: uuid('investment_id'),
  personId: uuid('person_id'),
  snapshotVersion: integer('snapshot_version').default(1).notNull(),
  isLatest: boolean('is_latest').default(true).notNull(),
  nameSnapshot: varchar('name_snapshot', { length: 255 }),
  panSnapshot: varchar('pan_snapshot', { length: 10 }),
  dobSnapshot: date('dob_snapshot'),
  genderSnapshot: varchar('gender_snapshot', { length: 20 }),
  mobileSnapshot: varchar('mobile_snapshot', { length: 20 }),
  emailSnapshot: varchar('email_snapshot', { length: 255 }),
  addressSnapshot: jsonb('address_snapshot'),
  capturedAt: timestamp('captured_at').defaultNow(),
});