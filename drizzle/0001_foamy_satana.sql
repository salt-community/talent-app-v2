ALTER TABLE "developer_profiles" ADD COLUMN "slug" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "developer_profiles" ADD CONSTRAINT "developer_profiles_slug_unique" UNIQUE("slug");