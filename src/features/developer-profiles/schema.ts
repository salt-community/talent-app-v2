import { sql } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { developersStatus } from "./types";

export const developerStatuses = pgEnum("developer_statuses", developersStatus);

export const developerProfiles = pgTable("developer_profiles", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  identityId: varchar("identity_id").default("1"),
  name: varchar().notNull(),
  email: varchar().notNull(),
  status: developerStatuses().notNull().default("unpublished"),
});

export type DeveloperProfileSelect = typeof developerProfiles.$inferSelect;
export type DeveloperProfileInsert = typeof developerProfiles.$inferInsert;
