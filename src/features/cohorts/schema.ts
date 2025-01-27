import { sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { CohortStatus } from "./types";

export const cohortStatuses = pgEnum("cohort_statuses", CohortStatus);

export const cohorts = pgTable("cohorts", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  identityId: varchar("identity_id").default("1"),
  name: varchar().notNull(),
  status: cohortStatuses().notNull().default("planned"),
  description: varchar("description").notNull().default("assignment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cohortIdentities = pgTable("cohorts_identities", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  cohortId: integer("cohort_id").notNull(),
  identityId: integer("identity_id").notNull(),
});

export type CohortInsert = typeof cohorts.$inferInsert;
export type CohortSelect = typeof cohorts.$inferSelect;
