ALTER TABLE "assignment_scores" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "updated_at" timestamp DEFAULT now();