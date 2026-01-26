import { pgTable, uuid, varchar, numeric, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const investmentSnapshot = pgTable('investment_snapshot', {
  id: uuid('id').primaryKey().defaultRandom(),
  investmentId: uuid('investment_id'),
  snapshotVersion: integer('snapshot_version').default(1).notNull(),
  isLatest: boolean('is_latest').default(true).notNull(),
  // Snapshot of investments fields
  productId: uuid('product_id'),
  schemeId: uuid('scheme_id'),
  product: varchar('product', { length: 100 }),
  amcClientCode: varchar('amc_client_code', { length: 50 }),
  strategyCode: varchar('strategy_code', { length: 50 }),
  strategyName: varchar('strategy_name', { length: 100 }),
  fmCode: varchar('fm_code', { length: 50 }),
  branchCode: varchar('branch_code', { length: 50 }),
  amcSharing: numeric('amc_sharing', { precision: 5, scale: 2 }),
  feeStructure: text('fee_structure'),
  remarks: text('remarks'),
  distributorId: uuid('distributor_id'),
  creId: uuid('cre_id'),
  rmId: uuid('rm_id'),
  status: varchar('status', { length: 30 }),
  capturedAt: timestamp('captured_at').defaultNow(),
});