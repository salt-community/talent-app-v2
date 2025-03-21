import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const assignments = pgTable("assignments", {
  id: uuid("id").primaryKey().defaultRandom(),
  cohortId: uuid("cohort_id").notNull(),
  title: varchar("title").notNull(),
  slug: varchar("slug").unique(),
  comment: varchar("comment").default(""),
  categories: varchar("categories").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assignmentScores = pgTable("assignment_scores", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentId: uuid("assignment_id").references(() => assignments.id),
  identityId: uuid("identity_id"),
  score: integer("score").default(0),
  comment: varchar("comment").default(""),
  category: varchar("category").default(""),
  createdAt: timestamp("created_at").defaultNow(),
  status: varchar("status").default("unpublished"),
});
