import { pgTable, uuid, varchar, boolean, integer, text, timestamp } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 100 }).notNull().unique(),
    finalycaProductId: integer("finalyca_product_id").unique(),
    desc: text("desc"),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;
