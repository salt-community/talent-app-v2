import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const assignmentsTable = pgTable("assignments", {
  id: uuid("id").primaryKey().defaultRandom(),
  cohortId: uuid("cohort_id").notNull(),
  title: varchar("title").notNull(),
  comment: varchar("comment").default(""),
  categories: varchar("categories").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assignmentScores = pgTable("assignment_scores", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentId: uuid("assignment_id"),
  identityId: uuid("identity_id"),
  score: integer("score").default(0),
  comment: varchar("comment").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});
