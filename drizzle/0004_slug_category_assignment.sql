ALTER TABLE "assignment_scores" ADD COLUMN "category" varchar DEFAULT '';--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "slug" varchar;--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_slug_unique" UNIQUE("slug");