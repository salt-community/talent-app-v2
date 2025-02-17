import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const developerProfiles = pgTable("developer_profiles", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  identityId: varchar("identity_id").notNull(),
  name: varchar().notNull(),
  slug: varchar().notNull().unique(),
  email: varchar().notNull(),
  status: varchar("status").notNull().default("unpublished"),
});

export type DeveloperProfileSelect = typeof developerProfiles.$inferSelect;
export type DeveloperProfileInsert = typeof developerProfiles.$inferInsert;
