import { pgTable, uuid, integer, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { investments } from './investments.schema';
import { persons } from '../person/persons.schema';

export const investmentHolders = pgTable('investment_holders', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentId: uuid('investment_id').references(() => investments.id),
  personId: uuid('person_id').references(() => persons.id),
  holderOrder: integer('holder_order'),
  relationship: varchar('relationship', { length: 100 }),
});

export const investmentHoldersRelations = relations(investmentHolders, ({ one }) => ({
  investment: one(investments, {
    fields: [investmentHolders.investmentId],
    references: [investments.id],
  }),
  person: one(persons, {
    fields: [investmentHolders.personId],
    references: [persons.id],
  }),
}));