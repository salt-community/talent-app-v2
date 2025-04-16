import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  boolean,
  unique,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull().unique(),
  description: varchar("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assignments = pgTable("assignments", {
  id: uuid("id").primaryKey().defaultRandom(),
  cohortId: uuid("cohort_id").notNull(),
  title: varchar("title").notNull(),
  slug: varchar("slug").unique(),
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
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const assignmentScores = pgTable(
  "assignment_scores",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    assignmentId: uuid("assignment_id").notNull(),
    identityId: uuid("identity_id").notNull(),
    status: varchar("status").default("unpublished"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    unique: unique().on(table.assignmentId, table.identityId),
  })
);

export const assignmentFeedback = pgTable("assignment_feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentScoreId: uuid("assignment_score_id")
    .references(() => assignmentScores.id)
    .notNull(),
  comment: varchar("comment").default(""),
  score: integer("score").default(0),
  categoryId: uuid("category_id").references(() => categories.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const fixList = pgTable("assignment_fix_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentScoreId: uuid("assignment_score_id")
    .references(() => assignmentScores.id)
    .notNull(),
  description: varchar("description").notNull(),
  isCompleted: boolean("is_completed").default(false),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const assignmentPrivateNotes = pgTable("assignment_private_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  assignmentScoreId: uuid("assignment_score_id")
    .references(() => assignmentScores.id)
    .notNull(),
  note: varchar("content").default(""),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
