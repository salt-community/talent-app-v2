CREATE TYPE "public"."developer_statuses" AS ENUM('unpublished', 'published', 'highlighted');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('developer', 'core', 'admin');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "developer_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identity_id" varchar DEFAULT '1',
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"status" "developer_statuses" DEFAULT 'unpublished' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "identities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" varchar NOT NULL,
	"role" "roles" DEFAULT 'developer' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "score_assignments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "score_assignments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"dev_id" uuid NOT NULL,
	"title" varchar NOT NULL,
	"comment" varchar,
	"score" integer NOT NULL,
	"tags" varchar[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "backgrounds" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "backgrounds_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"dev_id" uuid NOT NULL,
	"avatar_url" varchar DEFAULT '/avatar.png' NOT NULL,
	"name" varchar NOT NULL,
	"title" varchar NOT NULL,
	"bio" varchar NOT NULL,
	"links" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "background_skills" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "background_skills_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"background_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"level" integer DEFAULT 5 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"repository" varchar NOT NULL,
	"title" varchar NOT NULL,
	"image_url" varchar(500),
	"project_website" varchar,
	"description" varchar NOT NULL,
	"performance" varchar NOT NULL,
	"commits" varchar NOT NULL,
	"issues" varchar NOT NULL,
	"userId" uuid DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "background_skills" ADD CONSTRAINT "background_skills_background_id_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
