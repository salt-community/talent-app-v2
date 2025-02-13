import { sql } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { CohortStatus } from "./types";

export const cohortStatuses = pgEnum("cohort_statuses", CohortStatus);

export const cohorts = pgTable("cohorts", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar().notNull(),
  status: cohortStatuses().notNull().default("planned"),
  description: varchar("description").notNull().default("assignment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cohortIdentities = pgTable("cohort_identities", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  cohortId: uuid("cohort_id")
    .notNull()
    .references(() => cohorts.id, { onDelete: "cascade" }),
  identityId: uuid("identity_id").notNull(),
});

export type CohortInsert = typeof cohorts.$inferInsert;
export type CohortSelect = typeof cohorts.$inferSelect;
