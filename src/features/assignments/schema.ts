import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assignments = pgTable("assignments", {
  id: uuid("id").primaryKey().defaultRandom(),
  cohortId: uuid("cohort_id").notNull(),
  title: varchar("title").notNull(),
  slug: varchar("slug").unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const assignmentCategories = pgTable("assignment_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentId: uuid("assignment_id")
    .references(() => assignments.id)
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assignmentScores = pgTable("assignment_scores", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentId: uuid("assignment_id")
    .references(() => assignments.id)
    .notNull(),
  identityId: uuid("identity_id").notNull(),
  score: integer("score").default(0),
  status: varchar("status").default("unpublished"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const assignmentFeedback = pgTable("assignment_feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentScoreId: uuid("assignment_score_id")
    .references(() => assignmentScores.id)
    .notNull(),
  comment: text("comment").default(""),
  categoryId: uuid("category_id").references(() => categories.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const fixList = pgTable("fix_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  feedbackId: uuid("feedback_id")
    .references(() => assignmentFeedback.id)
    .notNull(),
  description: varchar("description").notNull(),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
