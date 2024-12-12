import { integer, jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { Tag } from "emblor";

export const backgrounds = pgTable("backgrounds", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  devId: uuid("dev_id").notNull(),
  avatarUrl: varchar().notNull().default("/avatar.png"),
  name: varchar().notNull(),
  title: varchar().notNull(),
  bio: varchar().notNull(),
  languages: jsonb().$type<Tag[]>().notNull(),
  educations: jsonb().$type<Tag[]>().notNull(),
  skills: jsonb().$type<Tag[]>().notNull(),
  links: jsonb().$type<SocialLink[]>().notNull(),
});

export const skills = pgTable("background_skills", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backroundId: integer()
    .notNull()
    .references(() => backgrounds.id),
  name: varchar().notNull(),
  level: integer().notNull().default(5),
});

export const educations = pgTable("background_educations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backroundId: integer()
    .notNull()
    .references(() => backgrounds.id),
  name: varchar().notNull(),
});

export const languages = pgTable("background_languages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backroundId: integer()
    .notNull()
    .references(() => backgrounds.id),
  name: varchar().notNull(),
  level: integer().notNull().default(5),
});

export type BackgroundInsert = typeof backgroundsTable.$inferInsert;
export type BackgroundSelect = typeof backgroundsTable.$inferSelect;
export type BackgroundUpdate = Partial<BackgroundSelect> &
  Required<Pick<BackgroundSelect, "id">>;

export type SocialLink = {
  url: string;
  name: "Github" | "LinkedIn" | "Resume";
};
