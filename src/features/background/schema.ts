import { integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import { Skill } from "./types";

export const backgroundsTable = pgTable("backgrounds", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  avatarUrl: varchar().notNull().default("/avatar.png"),
  name: varchar().notNull(),
  title: varchar().notNull(),
  bio: varchar().notNull(),
  languages: varchar().array().notNull(),
  educations: varchar().array().notNull(),
  skills: jsonb().$type<Skill[]>().notNull(),
  links: jsonb().$type<SocialLink[]>().notNull(),
});

export type BackgroundInsert = typeof backgroundsTable.$inferInsert;
export type BackgroundSelect = typeof backgroundsTable.$inferSelect;
export type SocialLink = {
  url: string;
  name: "Github" | "LinkedIn" | "Portfolio";
};

