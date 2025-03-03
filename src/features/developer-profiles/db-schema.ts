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
export const developerProfileBackgrounds = pgTable(
  "developer_profiles_backgrounds",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    developerProfileId: uuid("developer_profile_id").notNull(),
    avatarUrl: varchar("avatar_url").notNull().default(""),
    name: varchar().notNull(),
    title: varchar().notNull(),
    bio: varchar().notNull(),
    links: jsonb().$type<SocialLink[]>().notNull(),
  }
);
export const developerProfileSkills = pgTable("developer_profiles_skills", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backgroundId: integer("background_id").notNull(),
  developerProfileId: uuid("developerProfile_id").references(
    () => tempDeveloperProfiles.id,
    { onDelete: "cascade" }
  ),
  name: varchar().notNull(),
  level: integer().notNull().default(5),
});
export const developerProfileEducations = pgTable(
  "developer_profiles_educations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    backgroundId: integer("background_id").notNull(),
    developerProfileId: uuid("developerProfile_id").references(
      () => tempDeveloperProfiles.id,
      {
        onDelete: "cascade",
      }
    ),
    name: varchar().notNull(),
  }
);
export const developerProfileLanguages = pgTable(
  "developer_profiles_languages",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    backgroundId: integer("background_id").notNull(),
    developerProfileId: uuid("developerProfile_id").references(
      () => tempDeveloperProfiles.id,
      {
        onDelete: "cascade",
      }
    ),
    name: varchar().notNull(),
    level: integer().notNull().default(5),
  }
);
export const meiliSearchOutbox = pgTable("meili_search_outbox", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  developerProfileId: uuid("developer_profile_id").notNull(),
  operation: varchar().notNull(),
});

export const tempDeveloperProfiles = pgTable("temp_developer_profiles", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  identityId: varchar("identity_id").notNull(),
  name: varchar().notNull(),
  slug: varchar().unique(),
  email: varchar().notNull(),
  status: varchar("status").notNull().default("unpublished"),
  avatarUrl: varchar("avatar_url").notNull().default(""),
  title: varchar().notNull(),
  bio: varchar().notNull(),
  links: jsonb().$type<SocialLink[]>().notNull(),
});
