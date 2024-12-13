import { pgEnum, pgTable, integer } from "drizzle-orm/pg-core";

export const roles = pgEnum("roles", ["developer", "client", "core", "admin"]);

export const identities = pgTable("identities", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  clerkId: integer("clerk_id"),
  roles: roles().notNull().default("developer"),
});

export type IdentitySelect = typeof identities.$inferSelect;
export type IdentityInsert = typeof identities.$inferInsert;
