import { pgTable, integer, pgEnum, varchar } from "drizzle-orm/pg-core";

export const developersStatus = pgEnum("developers_status", [
  "unpublished",
  "published",
  "highlighted",
]);

export const developerProfiles = pgTable("developer_profiles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  identityId: varchar("identity_id").default("1"),
  name: varchar().notNull(),
  email: varchar().notNull(),
  status: developersStatus().notNull().default("unpublished"),
});

export type DeveloperProfileSelect = typeof developerProfiles.$inferSelect;
export type DeveloperProfileInsert = typeof developerProfiles.$inferInsert;
