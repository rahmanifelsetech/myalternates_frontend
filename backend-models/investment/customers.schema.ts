import { pgTable, uuid, varchar, date, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { persons } from '../person/persons.schema';
import { investmentAccounts } from './investment_accounts.schema';
import { investorBanks } from './investor_banks.schema';

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  myaltCode: varchar('myalt_code', { length: 30 }).unique().notNull(),
  primaryPersonId: uuid('primary_person_id').references(() => persons.id),
  residentialStatus: varchar('residential_status', { length: 50 }),
  subStatus: varchar('sub_status', { length: 100 }),
  inceptionDate: date('inception_date'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const customersRelations = relations(customers, ({ one, many }) => ({
  primaryPerson: one(persons, {
    fields: [customers.primaryPersonId],
    references: [persons.id],
  }),
  investmentAccounts: many(investmentAccounts),
  banks: many(investorBanks),
}));