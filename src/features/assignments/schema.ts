import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const assignmentsTable = pgTable("assignments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title").notNull(),
  score: integer("score").notNull().default(0),
  tags: varchar("tags").array().notNull().default([]),
  cohortId: uuid("cohort_id").notNull(),
  comment: varchar("comment").default("no comment provided"),
  categories: varchar("categories").array().default(["general"]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assignmentScores = pgTable("assignment_scores", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  assignmentId: uuid("assignment_id"),
  identityId: uuid("identity_id"),
  score: varchar("score").notNull().default("0"),
  comment: varchar("comment").default("no comment provided"),
  createdAt: timestamp("created_at").defaultNow(),
});
