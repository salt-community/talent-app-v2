import { pgTable, pgEnum, uuid, varchar } from "drizzle-orm/pg-core";

export const identities = pgTable("identities", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id").notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  role: varchar().notNull().default("developer"),
});

export type IdentitySelect = typeof identities.$inferSelect;
export type IdentityInsert = typeof identities.$inferInsert;
