import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const assignmentTable = pgTable("score_assignments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  devId: uuid("dev_id").notNull(),
  title: varchar().notNull(),
  comment: varchar(),
  score: integer().notNull(),
  tags: varchar().array().notNull(),
});
