ALTER TABLE "assignment_categories" DROP CONSTRAINT "assignment_categories_assignment_id_assignments_id_fk";
--> statement-breakpoint
ALTER TABLE "assignment_categories" DROP CONSTRAINT "assignment_categories_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "assignment_categories" ADD CONSTRAINT "assignment_categories_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment_categories" ADD CONSTRAINT "assignment_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;