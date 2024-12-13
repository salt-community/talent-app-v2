import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const assignmentTable = pgTable("score_assignments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull(),
  title: varchar().notNull(),
  comment: varchar(),
  score: integer().notNull(),
  tags: varchar().array().notNull(),
});
