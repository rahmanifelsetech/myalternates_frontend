import { pgTable, uuid, varchar, timestamp, date, numeric, text, index } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { investments } from "../investment/investments.schema";

export const transactions = pgTable("transactions", {
    id: uuid("id").defaultRandom().primaryKey(),
    investmentId: uuid("investment_id").notNull().references(() => investments.id, { onDelete: "cascade" }),
    
    orderDate: date("order_date").notNull(),
    valuationDate: date("valuation_date"), // or Value Date
    transactionType: varchar("transaction_type", { length: 50 }).notNull(), // Withdrawn / Addition
    amount: numeric("amount", { precision: 20, scale: 2 }).notNull(),
    
    // Capital tracking for AIF/GIFT
    capitalCommitment: numeric("capital_commitment", { precision: 20, scale: 2 }),
    capitalCalled: numeric("capital_called", { precision: 20, scale: 2 }),
    pendingCapital: numeric("pending_capital", { precision: 20, scale: 2 }), // capitalCommitment - capitalCalled

    remarks: text("remarks"),
    
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
    index("trx_inv_idx").on(table.investmentId),
    index("trx_date_idx").on(table.orderDate),
]);

export const transactionsRelations = relations(transactions, ({ one }) => ({
    investment: one(investments, {
        fields: [transactions.investmentId],
        references: [investments.id],
    }),
}));

export type Transaction = InferSelectModel<typeof transactions>;
export type NewTransaction = InferInsertModel<typeof transactions>;
