import { integer, jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { backgrounds } from "./db-schema";

// export const backgrounds = pgTable("backgrounds", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   developerProfileId: uuid("developer_profile_id").notNull(),
//   avatarUrl: varchar("avatar_url").notNull().default(""),
//   name: varchar().notNull(),
//   title: varchar().notNull(),
//   bio: varchar().notNull(),
//   links: jsonb().$type<SocialLink[]>().notNull(),
// });

// export const skills = pgTable("background_skills", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   backgroundId: integer("background_id")
//     .notNull()
//     .references(() => backgrounds.id, { onDelete: "cascade" }),
//   name: varchar().notNull(),
//   level: integer().notNull().default(5),
// });

// export const educations = pgTable("background_educations", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   backgroundId: integer("background_id")
//     .notNull()
//     .references(() => backgrounds.id, { onDelete: "cascade" }),
//   name: varchar().notNull(),
// });

export const languages = pgTable("background_languages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backgroundId: integer("background_id")
    .notNull()
    .references(() => backgrounds.id, { onDelete: "cascade" }),
  name: varchar().notNull(),
  level: integer().notNull().default(5),
});

export const meiliSearchOutbox = pgTable("meili_search_outbox", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  developerProfileId: uuid("developer_profile_id").notNull(),
  operation: varchar().notNull(),
});
