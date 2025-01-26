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
import { identities } from "../iam/schema";

export const cohortStatuses = pgEnum("cohort_statuses", CohortStatus);

export const cohorts = pgTable("cohorts", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  identityId: varchar("identity_id").default("1"),
  name: varchar().notNull(),
  status: cohortStatuses().notNull().default("planned"),
  description: varchar("description").notNull().default("assignment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type CohortSelect = typeof cohorts.$inferSelect;
export type CohortInsert = typeof cohorts.$inferInsert;

export const cohortIdentities = pgTable("cohorts_identities", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  cohortId: integer("cohort_id")
    .notNull()
    .references(() => cohorts.id, { onDelete: "cascade" }),
  identityId: integer("identity_id")
    .notNull()
    .references(() => identities.id, { onDelete: "cascade" }),
});

export type cohortSelect = typeof cohorts.$inferSelect;
export type cohortInsert = typeof cohorts.$inferInsert;
export type cohortIdentitiesSelect = typeof cohortIdentities.$inferSelect;
export type cohortIdentitiesInsert = typeof cohortIdentities.$inferInsert;
