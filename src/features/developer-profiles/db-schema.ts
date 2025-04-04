import { sql } from "drizzle-orm";
import { integer, jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { SocialLink } from "./types";

export const developerProfileSkills = pgTable("developer_profiles_skills", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  developerProfileId: uuid("developerProfile_id").references(
    () => developerProfiles.id,
    { onDelete: "cascade" }
  ),
  name: varchar().notNull(),
  level: integer().notNull().default(5),
});
export const developerProfileEducations = pgTable(
  "developer_profiles_educations",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    developerProfileId: uuid("developerProfile_id").references(
      () => developerProfiles.id,
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
    developerProfileId: uuid("developerProfile_id").references(
      () => developerProfiles.id,
      {
        onDelete: "cascade",
      }
    ),
    name: varchar().notNull(),
    level: integer().notNull().default(5),
  }
);
export const searchOutbox = pgTable("meili_search_outbox", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  developerProfileId: uuid("developer_profile_id").notNull(),
  operation: varchar().notNull(),
});

export const developerProfiles = pgTable("developer_profiles", {
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
  links: jsonb().$type<SocialLink[]>().notNull(),
  bio: varchar(),
  headerLanguage: varchar().default("english"),
});

export const newDeveloperProfileEducations = pgTable(
  "new_developer_profiles_educations",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    developerProfileId: uuid("developerProfile_id").references(
      () => developerProfiles.id,
      {
        onDelete: "cascade",
      }
    ),
    organization: varchar().notNull(),
    date: varchar().notNull(),
    role: varchar().notNull(),
    description: varchar().notNull(),
  }
);

export const developerProfileJobs = pgTable("developer_profiles_jobs", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  developerProfileId: uuid("developerProfile_id").references(
    () => developerProfiles.id,
    {
      onDelete: "cascade",
    }
  ),
  organization: varchar().notNull(),
  date: varchar().notNull(),
  role: varchar().notNull(),
  description: varchar().notNull(),
});
