import { pgTable, pgEnum, uuid, integer } from "drizzle-orm/pg-core";

export const roles = pgEnum("roles", ["developer", "core", "admin"]);
export type Roles = typeof roles;

export const identities = pgTable("identities", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: integer("clerk_id"),
  role: roles().notNull().default("developer"),
});

export type IdentitySelect = typeof identities.$inferSelect;
export type IdentityInsert = typeof identities.$inferInsert;
