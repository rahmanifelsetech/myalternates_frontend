import { pgTable, uuid, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { users } from '../core/users.schema'

export const entityAuditLogs = pgTable('entity_audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  entityType: varchar('entity_type', { length: 50 }),
  entityId: uuid('entity_id'),
  action: varchar('action', { length: 20 }),
  oldData: jsonb('old_data'),
  newData: jsonb('new_data'),
  performedBy: uuid('performed_by').references(() => users.id),
  performedAt: timestamp('performed_at').defaultNow(),
});
