CREATE TABLE "assignment_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assignment_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "assignment_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assignment_score_id" uuid NOT NULL,
	"comment" text DEFAULT '',
	"category_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "fix_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"feedback_id" uuid NOT NULL,
	"description" varchar NOT NULL,
	"is_completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "assignment_scores" ALTER COLUMN "assignment_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment_scores" ALTER COLUMN "identity_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment_scores" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "assignment_categories" ADD CONSTRAINT "assignment_categories_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment_categories" ADD CONSTRAINT "assignment_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment_feedback" ADD CONSTRAINT "assignment_feedback_assignment_score_id_assignment_scores_id_fk" FOREIGN KEY ("assignment_score_id") REFERENCES "public"."assignment_scores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment_feedback" ADD CONSTRAINT "assignment_feedback_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fix_items" ADD CONSTRAINT "fix_items_feedback_id_assignment_feedback_id_fk" FOREIGN KEY ("feedback_id") REFERENCES "public"."assignment_feedback"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment_scores" DROP COLUMN "comment";--> statement-breakpoint
ALTER TABLE "assignment_scores" DROP COLUMN "category";--> statement-breakpoint
ALTER TABLE "assignments" DROP COLUMN "comment";--> statement-breakpoint
ALTER TABLE "assignments" DROP COLUMN "categories";