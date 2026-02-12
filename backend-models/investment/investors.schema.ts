import { pgTable, uuid, varchar, date, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { persons } from '../person/persons.schema';
import { investorBanks } from './investor_banks.schema';
import { investmentAccounts } from './investment_accounts.schema';

export const investors = pgTable('investors', {
  id: uuid('id').primaryKey().defaultRandom(),
  myaltCode: varchar('myalt_code', { length: 30 }).unique().notNull(),
  primaryPersonId: uuid('primary_person_id').references(() => persons.id),
  primaryPan: varchar('primary_pan', { length: 10 }).unique(),
  residentialStatus: varchar('residential_status', { length: 50 }),
  subStatus: varchar('sub_status', { length: 100 }),
  inceptionDate: date('inception_date', { mode: 'string' }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const investorsRelations = relations(investors, ({ one, many }) => ({
  primaryPerson: one(persons, {
    fields: [investors.primaryPersonId],
    references: [persons.id],
  }),
  investmentAccounts: many(investmentAccounts),
}));
