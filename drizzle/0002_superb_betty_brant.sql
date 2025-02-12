CREATE TYPE "public"."cohort_statuses" AS ENUM('planned', 'ongoing', 'finished');--> statement-breakpoint
CREATE TYPE "public"."developer_statuses" AS ENUM('unpublished', 'published', 'highlighted');--> statement-breakpoint
CREATE TYPE "public"."operation" AS ENUM('upsert', 'delete');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assignments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cohort_id" uuid NOT NULL,
	"title" varchar NOT NULL,
	"comment" varchar DEFAULT '',
	"categories" varchar[] DEFAULT '{}',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cohorts_identities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cohort_id" uuid NOT NULL,
	"identity_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cohorts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"status" "cohort_statuses" DEFAULT 'planned' NOT NULL,
	"description" varchar DEFAULT 'assignment' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "meili_search_outbox" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "meili_search_outbox_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"dev_id" uuid NOT NULL,
	"operation" "operation" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "score_assignments" RENAME TO "assignment_scores";--> statement-breakpoint
ALTER TABLE "backgrounds" RENAME COLUMN "avatarUrl" TO "avatar_url";--> statement-breakpoint
ALTER TABLE "background_educations" RENAME COLUMN "backroundId" TO "background_id";--> statement-breakpoint
ALTER TABLE "background_languages" RENAME COLUMN "backroundId" TO "background_id";--> statement-breakpoint
ALTER TABLE "background_skills" RENAME COLUMN "backroundId" TO "background_id";--> statement-breakpoint
ALTER TABLE "identities" RENAME COLUMN "roles" TO "role";--> statement-breakpoint
ALTER TABLE "assignment_scores" RENAME COLUMN "dev_id" TO "identity_id";--> statement-breakpoint
ALTER TABLE "background_educations" DROP CONSTRAINT "background_educations_backroundId_backgrounds_id_fk";
--> statement-breakpoint
ALTER TABLE "background_languages" DROP CONSTRAINT "background_languages_backroundId_backgrounds_id_fk";
--> statement-breakpoint
ALTER TABLE "background_skills" DROP CONSTRAINT "background_skills_backroundId_backgrounds_id_fk";
--> statement-breakpoint
ALTER TABLE "identities" ALTER COLUMN "clerk_id" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "identities" ALTER COLUMN "clerk_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment_scores" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "assignment_scores" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "assignment_scores" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "assignment_scores" ALTER COLUMN "comment" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "assignment_scores" ALTER COLUMN "score" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "identities" ADD COLUMN "name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "identities" ADD COLUMN "email" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "identities" ADD COLUMN "cohort_id" uuid;--> statement-breakpoint
ALTER TABLE "assignment_scores" ADD COLUMN "assignment_id" uuid;--> statement-breakpoint
ALTER TABLE "assignment_scores" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "image_alt" varchar;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "last_commits" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "background_educations" ADD CONSTRAINT "background_educations_background_id_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "background_languages" ADD CONSTRAINT "background_languages_background_id_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "background_skills" ADD CONSTRAINT "background_skills_background_id_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "backgrounds" DROP COLUMN IF EXISTS "languages";--> statement-breakpoint
ALTER TABLE "backgrounds" DROP COLUMN IF EXISTS "educations";--> statement-breakpoint
ALTER TABLE "backgrounds" DROP COLUMN IF EXISTS "skills";--> statement-breakpoint
ALTER TABLE "assignment_scores" DROP COLUMN IF EXISTS "title";--> statement-breakpoint
ALTER TABLE "assignment_scores" DROP COLUMN IF EXISTS "tags";