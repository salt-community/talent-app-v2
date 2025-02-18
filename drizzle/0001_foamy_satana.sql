ALTER TABLE "developer_profiles" ADD COLUMN "slug" varchar;--> statement-breakpoint
ALTER TABLE "developer_profiles" ADD CONSTRAINT "developer_profiles_slug_unique" UNIQUE("slug");