import { sql } from "drizzle-orm";
import { integer, jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { SocialLink } from "./types";

export const developerProfiles = pgTable("developer_profiles", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  identityId: varchar("identity_id").notNull(),
  name: varchar().notNull(),
  slug: varchar().unique(),
  email: varchar().notNull(),
  status: varchar("status").notNull().default("unpublished"),
});
export const backgrounds = pgTable("backgrounds", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  developerProfileId: uuid("developer_profile_id").notNull(),
  avatarUrl: varchar("avatar_url").notNull().default(""),
  name: varchar().notNull(),
  title: varchar().notNull(),
  bio: varchar().notNull(),
  links: jsonb().$type<SocialLink[]>().notNull(),
});
