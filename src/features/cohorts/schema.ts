import { sql } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { CohortStatus } from "./types";

export const cohortStatuses = pgEnum("cohort_statuses", CohortStatus);

export const cohort = pgTable("cohort", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  identityId: varchar("identity_id").default("1"),
  name: varchar().notNull(),
  email: varchar().notNull(),
  status: cohortStatuses().notNull().default("planned"),
});

export type cohortSelect = typeof cohort.$inferSelect;
export type cohortInsert = typeof cohort.$inferInsert;
