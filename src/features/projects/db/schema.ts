import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username").notNull(),
  repository: varchar("repository").notNull(),
  title: varchar("title").notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  projectWebsite: varchar("project_website"),
  description: varchar("description").notNull(),
  performance: varchar("performance").notNull(),
  commits: varchar("commits").notNull(),
  issues: varchar("issues").notNull(),
  userId: uuid("userId").notNull().defaultRandom(),
});

export type ProjectInsert = typeof projects.$inferInsert;
export type ProjectSelect = typeof projects.$inferSelect;
