import { uuid, varchar, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { schemes } from './schemes.schema';

export const scheme_overall_performance = pgTable('scheme_overall_performance', {
    id: uuid("id").defaultRandom().primaryKey(),
    schemeId: uuid('scheme_id').references(() => schemes.id, { onDelete: 'cascade' }),
    schemeRet1m: varchar("scheme_ret_1m", { length: 50 }),
    schemeRet3m: varchar("scheme_ret_3m", { length: 50 }),
    schemeRet6m: varchar("scheme_ret_6m", { length: 50 }),
    schemeRet1y: varchar("scheme_ret_1y", { length: 50 }),
    schemeRet2y: varchar("scheme_ret_2y", { length: 50 }),
    schemeRet3y: varchar("scheme_ret_3y", { length: 50 }),
    schemeRet5y: varchar("scheme_ret_5y", { length: 50 }),
    schemeRet10y: varchar("scheme_ret_10y", { length: 50 }),
    schemeRetSinceInception: varchar("scheme_ret_since_inception", { length: 50 }),
    bmRet1m: varchar("bm_ret_1m", { length: 50 }),
    bmRet3m: varchar("bm_ret_3m", { length: 50 }),
    bmRet6m: varchar("bm_ret_6m", { length: 50 }),
    bmRet1y: varchar("bm_ret_1y", { length: 50 }),
    bmRet2y: varchar("bm_ret_2y", { length: 50 }),
    bmRet3y: varchar("bm_ret_3y", { length: 50 }),
    bmRet5y: varchar("bm_ret_5y", { length: 50 }),
    bmRet10y: varchar("bm_ret_10y", { length: 50 }),
    bmRetSinceInception: varchar("bm_ret_since_inception", { length: 50 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const schemeOverallPerformanceRelations = relations(scheme_overall_performance, ({ one }) => ({
    scheme: one(schemes, {
        fields: [scheme_overall_performance.schemeId],
        references: [schemes.id],
    }),
}));