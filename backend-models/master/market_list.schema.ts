import { pgTable, uuid, varchar, timestamp, date, index } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { holdings } from "../portfolio/holdings.schema";
import { categories } from "./categories.schema";

export const marketList = pgTable("market_list", {
    id: uuid("id").defaultRandom().primaryKey(),
    companyName: varchar("company_name", { length: 255 }).notNull(),
    isinCode: varchar("isin_code", { length: 50 }).unique().notNull(),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
    categorization: varchar("categorization", { length: 100 }), // Large Cap, etc. - used for mapping to categoryId
    sector: varchar("sector", { length: 100 }),
    asOnDate: date("as_on_date", { mode: "string" }),
    
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
    index("mkt_company_idx").on(table.companyName),
    index("mkt_isin_idx").on(table.isinCode),
]);

export const marketListRelations = relations(marketList, ({ many, one }) => ({
    holdings: many(holdings),
    category: one(categories, {
        fields: [marketList.categoryId],
        references: [categories.id],
    }),
}));

export type MarketSecurity = InferSelectModel<typeof marketList>;
export type NewMarketSecurity = InferInsertModel<typeof marketList>;
