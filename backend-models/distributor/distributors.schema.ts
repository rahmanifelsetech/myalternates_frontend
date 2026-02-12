import { relations, InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from '../core/users.schema';
import { persons } from '../person/persons.schema';
import { pgTable, uuid, text, timestamp, varchar, numeric, date, boolean } from 'drizzle-orm/pg-core';
import { distributorBanks } from './distributor_banks.schema';

export const distributors = pgTable('distributors', {
    id: uuid('id').defaultRandom().primaryKey(),
    personId: uuid('person_id').notNull().references(() => persons.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    category: text('category'),
    parentDistributorId: uuid('parent_distributor_id').references(() => distributors.id),
    code: varchar('code', { length: 100 }).unique(),
    relationshipManagerId: uuid('relationship_manager_id').references(() => users.id),
    totalAum: numeric('total_aum', { precision: 18, scale: 2 }),
    commission: numeric('commission', { precision: 10, scale: 2 }),
    agreementDate: date('agreement_date'),
    apmiRegNo: varchar('apmi_reg_no', { length: 50 }),
    apmiEuinNo: varchar('apmi_euin_no', { length: 50 }),
    nismCertNo: varchar('nism_cert_no', { length: 50 }),
    amfiRegNo: varchar('amfi_reg_no', { length: 50 }),
    amfiEuinNo: varchar('amfi_euin_no', { length: 50 }),
    tanNo: varchar('tan_no', { length: 50 }),
    gstNo: varchar('gst_no', { length: 50 }),
    gstType: varchar('gst_type', { length: 50 }),
    internalNotes: text('internal_notes'),
    totalCommissionPaid: numeric('total_commission_paid', { precision: 18, scale: 2 }),
    isVerified: boolean('is_verified').default(false).notNull(),
    lastCommissionPaidDate: date('last_commission_paid_date'),
    lastLoginAt: timestamp('last_login_at'),
    lastActivityAt: timestamp('last_activity_at'),
    isActive: boolean('is_active').default(true).notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdById: uuid('created_by_id').references(() => users.id),
    updatedById: uuid('updated_by_id').references(() => users.id),
});

export const distributorsRelations = relations(distributors, ({ one, many }) => ({
    banks: many(distributorBanks),
    parent: one(distributors, {
        fields: [distributors.parentDistributorId],
        references: [distributors.id],
    }),
    person: one(persons, {
        fields: [distributors.personId],
        references: [persons.id],
    }),
    relationshipManager: one(users, {
        fields: [distributors.relationshipManagerId],
        references: [users.id],
    }),
    createdBy: one(users, {
        fields: [distributors.createdById],
        references: [users.id],
    }),
    updatedBy: one(users, {
        fields: [distributors.updatedById],
        references: [users.id],
    }),
}));

export type Distributor = InferSelectModel<typeof distributors>;
export type NewDistributor = InferInsertModel<typeof distributors>;