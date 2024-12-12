import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import { integer, jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { Tag } from "emblor";

export const backgrounds = pgTable("backgrounds", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  devId: uuid("dev_id").notNull(),
  avatarUrl: varchar("avatar_url").notNull().default("/avatar.png"),
  name: varchar().notNull(),
  title: varchar().notNull(),
  bio: varchar().notNull(),
  languages: jsonb().$type<Tag[]>().notNull(),
  educations: jsonb().$type<Tag[]>().notNull(),
  skills: jsonb().$type<Tag[]>().notNull(),
  links: jsonb().$type<SocialLink[]>().notNull(),
});

const backgroundsRelations = relations(backgrounds, ({ many }) => ({
  skills: many(skills),
  educations: many(educations),
  languages: many(languages),
}));

export const skills = pgTable("background_skills", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backgroundId: integer("background_id")
    .notNull()
    .references(() => backgrounds.id),
  name: varchar().notNull(),
  level: integer().notNull().default(5),
});

export const skillsRelations = relations(skills, ({ one }) => ({
  background: one(backgrounds, {
    fields: [skills.backgroundId],
    references: [backgrounds.id],
  }),
}));

export const educations = pgTable("background_educations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backgroundId: integer("background_id")
    .notNull()
    .references(() => backgrounds.id),
  name: varchar().notNull(),
});

export const educationsRelations = relations(educations, ({ one }) => ({
  background: one(backgrounds, {
    fields: [educations.backgroundId],
    references: [backgrounds.id],
  }),
}));

export const languages = pgTable("background_languages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backgroundId: integer("background_id")
    .notNull()
    .references(() => backgrounds.id),
  name: varchar().notNull(),
  level: integer().notNull().default(5),
});

export const languagesRelations = relations(languages, ({ one }) => ({
  background: one(backgrounds, {
    fields: [languages.backgroundId],
    references: [backgrounds.id],
  }),
}));

export type BackgroundInsert = typeof backgrounds.$inferInsert;
export type BackgroundSelect = typeof backgrounds.$inferSelect;
export type BackgroundUpdate = Partial<BackgroundSelect> &
  Required<Pick<BackgroundSelect, "id">>;

export type SocialLink = {
  url: string;
  name: "Github" | "LinkedIn" | "Resume";
};
