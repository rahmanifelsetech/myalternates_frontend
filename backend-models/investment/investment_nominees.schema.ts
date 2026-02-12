import { pgTable, uuid, varchar, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { investments } from './investments.schema';
import { persons } from '../person/persons.schema';

export const investmentNominees = pgTable('investment_nominees', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentId: uuid('investment_id').references(() => investments.id),
  personId: uuid('person_id').references(() => persons.id),
  relationship: varchar('relationship', { length: 100 }),
  percentage: numeric('percentage', { precision: 5, scale: 2 }),
  idType: varchar('id_type', { length: 30 }),
  idNumber: varchar('id_number', { length: 50 }),
});

export const investmentNomineesRelations = relations(investmentNominees, ({ one }) => ({
  investment: one(investments, {
    fields: [investmentNominees.investmentId],
    references: [investments.id],
  }),
  person: one(persons, {
    fields: [investmentNominees.personId],
    references: [persons.id],
  })
}));