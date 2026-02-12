import { pgTable, uuid, varchar, timestamp, date, numeric, index } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { investments } from "../investment/investments.schema";
import { marketList } from "../master/market_list.schema";

export const holdings = pgTable("holdings", {
    id: uuid("id").defaultRandom().primaryKey(),
    investmentId: uuid("investment_id").notNull().references(() => investments.id, { onDelete: "cascade" }),
    
    // Link to Security - marketListId is the foreign key to market_list
    marketListId: uuid("market_list_id").notNull().references(() => marketList.id, { onDelete: "restrict" }),
    
    // Snapshot of security details at the time of holding (for historical accuracy)
    securityName: varchar("security_name", { length: 255 }),
    securityType: varchar("security_type", { length: 50 }), // Equity, Bond, etc.
    
    valuationDate: date("valuation_date").notNull(),
    // quantity: numeric("quantity", { precision: 20, scale: 4 }),
    // averagePrice: numeric("average_price", { precision: 20, scale: 2 }),
    // marketPrice: numeric("market_price", { precision: 20, scale: 2 }),
    // currentValue: numeric("current_value", { precision: 20, scale: 2 }),
    portfolioWeightage: numeric("portfolio_weightage", { precision: 5, scale: 2 }),
    
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
    index("hld_inv_idx").on(table.investmentId),
    index("hld_date_idx").on(table.valuationDate),
    index("hld_market_list_idx").on(table.marketListId),
]);

export const holdingsRelations = relations(holdings, ({ one }) => ({
    investment: one(investments, {
        fields: [holdings.investmentId],
        references: [investments.id],
    }),
    security: one(marketList, {
        fields: [holdings.marketListId],
        references: [marketList.id],
    }),
}));

export type Holding = InferSelectModel<typeof holdings>;
export type NewHolding = InferInsertModel<typeof holdings>;
