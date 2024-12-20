import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const backgrounds = pgTable("backgrounds", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  devId: uuid("dev_id").notNull(),
  avatarUrl: varchar("avatar_url").notNull().default("/avatar.png"),
  name: varchar().notNull(),
  title: varchar().notNull(),
  bio: varchar().notNull(),
  links: jsonb().$type<SocialLink[]>().notNull(),
});

export const skills = pgTable("background_skills", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backgroundId: integer("background_id")
    .notNull()
    .references(() => backgrounds.id),
  name: varchar().notNull(),
  level: integer().notNull().default(5),
});

export const educations = pgTable("background_educations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backgroundId: integer("background_id")
    .notNull()
    .references(() => backgrounds.id),
  name: varchar().notNull(),
});

export const languages = pgTable("background_languages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  backgroundId: integer("background_id")
    .notNull()
    .references(() => backgrounds.id),
  name: varchar().notNull(),
  level: integer().notNull().default(5),
});

export const transaction = pgEnum("transaction", ["upsert", "delete"]);

export const meiliTransactions = pgTable("meili_transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  devId: uuid("dev_id").notNull(),
  transactionType: transaction().notNull(),
});

export type TransactionInsert = typeof meiliTransactions.$inferInsert;
export type TransactionSelect = typeof meiliTransactions.$inferSelect;

export type BackgroundInsert = typeof backgrounds.$inferInsert & {
  skills: string[];
  languages: string[];
  educations: string[];
};

export type BackgroundSelect = typeof backgrounds.$inferSelect;

export type SkillInsert = typeof skills.$inferInsert;
export type SkillSelect = typeof skills.$inferSelect;
export type LanguageInsert = typeof languages.$inferInsert;
export type LanguageSelect = typeof languages.$inferSelect;
export type EducationInsert = typeof educations.$inferInsert;
export type EducationSelect = typeof educations.$inferSelect;

export type SocialLink = {
  url: string;
  name: "Github" | "LinkedIn" | "Resume";
};
