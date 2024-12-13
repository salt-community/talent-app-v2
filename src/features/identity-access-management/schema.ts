import { pgEnum, pgTable, integer, uuid } from "drizzle-orm/pg-core";

export const roles = pgEnum("roles", ["developer", "client", "core", "admin"]);

export const identities = pgTable("identities", {
  id: uuid().primaryKey().notNull().default("gen_random_uuid()"),
  clerkId: integer("clerk_id"),
  roles: roles().notNull().default("developer"),
});

export type IdentitySelect = typeof identities.$inferSelect;
export type IdentityInsert = typeof identities.$inferInsert;
