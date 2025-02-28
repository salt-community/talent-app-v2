CREATE TABLE IF NOT EXISTS "temp_developer_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identity_id" varchar NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar,
	"email" varchar NOT NULL,
	"status" varchar DEFAULT 'unpublished' NOT NULL,
	"avatar_url" varchar DEFAULT '' NOT NULL,
	"title" varchar NOT NULL,
	"bio" varchar NOT NULL,
	"links" jsonb NOT NULL,
	CONSTRAINT "temp_developer_profiles_slug_unique" UNIQUE("slug")
);
