import { pgTable, uuid, varchar, numeric, date, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { investments } from './investments.schema';

export const investmentDrawdowns = pgTable('investment_drawdowns', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentId: uuid('investment_id').references(() => investments.id),
  drawdownNumber: varchar('drawdown_number', { length: 50 }),
  paymentReferenceNumber: varchar('payment_reference_number', { length: 100 }),
  drawdownAmount: numeric('drawdown_amount', { precision: 20, scale: 2 }),
  drawdownPercentage: numeric('drawdown_percentage', { precision: 5, scale: 2 }),
  paymentDueDate: date('payment_due_date'),
  paymentReceivedDate: date('payment_received_date'),
  nextDueDate: date('next_due_date'),
  lateFee: numeric('late_fee', { precision: 20, scale: 2 }),
  remarks: text('remarks'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const investmentDrawdownsRelations = relations(investmentDrawdowns, ({ one }) => ({
  investment: one(investments, {
    fields: [investmentDrawdowns.investmentId],
    references: [investments.id],
  }),
}));