ALTER TABLE "assignment_scores" DROP CONSTRAINT "assignment_scores_assignment_id_assignments_id_fk";
--> statement-breakpoint
ALTER TABLE "assignment_scores" ALTER COLUMN "assignment_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment_scores" ALTER COLUMN "identity_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment_categories" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "assignment_scores" DROP COLUMN "score";--> statement-breakpoint
ALTER TABLE "assignment_scores" DROP COLUMN "comment";--> statement-breakpoint
ALTER TABLE "assignment_scores" DROP COLUMN "category";--> statement-breakpoint
ALTER TABLE "assignments" DROP COLUMN "comment";--> statement-breakpoint
ALTER TABLE "assignments" DROP COLUMN "categories";--> statement-breakpoint