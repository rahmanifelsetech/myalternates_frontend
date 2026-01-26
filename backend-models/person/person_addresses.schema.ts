import { pgTable, uuid, text, varchar, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { persons } from './persons.schema';

export const personAddresses = pgTable('person_addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  personId: uuid('person_id').references(() => persons.id),
  address1: text('address_1'),
  address2: text('address_2'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  country: varchar('country', { length: 100 }),
  pincode: varchar('pincode', { length: 20 }),
  isPrimary: boolean('is_primary').default(true),
});

export const personAddressesRelations = relations(personAddresses, ({ one }) => ({
  person: one(persons, {
    fields: [personAddresses.personId],
    references: [persons.id],
  }),
}));