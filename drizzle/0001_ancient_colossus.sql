ALTER TABLE "developer_profiles" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "developer_profiles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "developer_profiles" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "developer_profiles" ALTER COLUMN "status" SET DATA TYPE developer_statuses;--> statement-breakpoint
ALTER TABLE "backgrounds" ADD COLUMN "dev_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "score_assignments" ADD COLUMN "dev_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "score_assignments" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "public"."identities" ALTER COLUMN "roles" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."roles";--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('developer', 'core', 'admin');--> statement-breakpoint
ALTER TABLE "public"."identities" ALTER COLUMN "roles" SET DATA TYPE "public"."roles" USING "roles"::"public"."roles";--> statement-breakpoint
DROP TYPE "public"."developers_status";