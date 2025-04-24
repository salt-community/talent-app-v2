import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const cohorts = pgTable("cohorts", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar().notNull().unique(),
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
