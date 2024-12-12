import { integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import { Tag } from "emblor";

export const backgroundsTable = pgTable("backgrounds", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  avatarUrl: varchar().notNull().default("/avatar.png"),
  name: varchar().notNull(),
  title: varchar().notNull(),
  bio: varchar().notNull(),
  languages: jsonb().$type<Tag[]>().notNull(),
  educations: jsonb().$type<Tag[]>().notNull(),
  skills: jsonb().$type<Tag[]>().notNull(),
  links: jsonb().$type<SocialLink[]>().notNull(),
});

export type BackgroundInsert = typeof backgroundsTable.$inferInsert;
export type BackgroundSelect = typeof backgroundsTable.$inferSelect;
export type BackgroundUpdate = Partial<BackgroundSelect> &
  Required<Pick<BackgroundSelect, "id">>;

export type SocialLink = {
  url: string;
  name: "Github" | "LinkedIn" | "Resume";
};
