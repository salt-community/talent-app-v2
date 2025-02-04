import { pgTable, pgEnum, uuid, varchar } from "drizzle-orm/pg-core";

export const roles = pgEnum("roles", ["developer", "core", "admin"]);
export type Roles = typeof roles;

export const identities = pgTable("identities", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id").notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  role: roles().notNull().default("developer"),
  cohortId: uuid("cohort_id"),
});

export type IdentitySelect = typeof identities.$inferSelect;
export type IdentityInsert = typeof identities.$inferInsert;
