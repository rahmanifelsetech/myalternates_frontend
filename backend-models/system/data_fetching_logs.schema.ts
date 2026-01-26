import { pgTable, uuid, varchar, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const data_fetching_logs = pgTable('data_fetching_logs', {
    id: uuid('id').defaultRandom().primaryKey(),
    jobType: varchar('job_type', { length: 100 }).notNull(), // e.g., 'FETCH_SCHEMES'
    logType: varchar('log_type', { length: 50 }).default('DATA_FETCHING').notNull(), // DATA_FETCHING, DATA_UPLOAD
    status: varchar('status', { length: 50 }).default('PENDING').notNull(), // PENDING, IN_PROGRESS, COMPLETED, FAILED
    
    totalRecords: integer('total_records').default(0),
    processedRecords: integer('processed_records').default(0),
    addedRecords: integer('added_records').default(0),
    updatedRecords: integer('updated_records').default(0),
    failedRecords: integer('failed_records').default(0),
    
    errorDetails: jsonb('error_details'), // Array of { identifier: string, reason: string }
    
    startedAt: timestamp('started_at').defaultNow(),
    completedAt: timestamp('completed_at'),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type DataFetchingLog = typeof data_fetching_logs;