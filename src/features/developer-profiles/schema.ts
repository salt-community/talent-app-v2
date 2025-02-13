import { sql } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const developerStatuses = pgEnum("developer_statuses", [
  "unpublished",
  "published",
  "highlighted",
]);

export const developerProfiles = pgTable("developer_profiles", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  identityId: varchar("identity_id").default("1"),
  name: varchar().notNull(),
  email: varchar().notNull(),
  status: developerStatuses().notNull().default("unpublished"),
  new_status: varchar("new_status").default("unpublished"),
});

export type DeveloperProfileSelect = typeof developerProfiles.$inferSelect;
export type DeveloperProfileInsert = typeof developerProfiles.$inferInsert;
