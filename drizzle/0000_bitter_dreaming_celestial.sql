CREATE TYPE "public"."developers_status" AS ENUM('unpublished', 'published', 'highlighted');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('developer', 'client', 'core', 'admin');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "backgrounds" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "backgrounds_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"avatarUrl" varchar DEFAULT '/avatar.png' NOT NULL,
	"name" varchar NOT NULL,
	"title" varchar NOT NULL,
	"bio" varchar NOT NULL,
	"languages" jsonb NOT NULL,
	"educations" jsonb NOT NULL,
	"skills" jsonb NOT NULL,
	"links" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "background_educations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "background_educations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"backroundId" integer NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "background_languages" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "background_languages_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"backroundId" integer NOT NULL,
	"name" varchar NOT NULL,
	"level" integer DEFAULT 5 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "background_skills" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "background_skills_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"backroundId" integer NOT NULL,
	"name" varchar NOT NULL,
	"level" integer DEFAULT 5 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "developer_profiles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "developer_profiles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"identity_id" varchar DEFAULT '1',
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"status" "developers_status" DEFAULT 'unpublished' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "identities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" integer,
	"roles" "roles" DEFAULT 'developer' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "score_assignments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "score_assignments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"title" varchar NOT NULL,
	"comment" varchar,
	"score" integer NOT NULL,
	"tags" varchar[] NOT NULL
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
 ALTER TABLE "background_educations" ADD CONSTRAINT "background_educations_backroundId_backgrounds_id_fk" FOREIGN KEY ("backroundId") REFERENCES "public"."backgrounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "background_languages" ADD CONSTRAINT "background_languages_backroundId_backgrounds_id_fk" FOREIGN KEY ("backroundId") REFERENCES "public"."backgrounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "background_skills" ADD CONSTRAINT "background_skills_backroundId_backgrounds_id_fk" FOREIGN KEY ("backroundId") REFERENCES "public"."backgrounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
