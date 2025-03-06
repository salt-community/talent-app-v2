ALTER TABLE "developer_profiles_educations" ALTER COLUMN "background_id" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "developer_profiles_educations" ALTER COLUMN "background_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "developer_profiles_languages" ALTER COLUMN "background_id" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "developer_profiles_languages" ALTER COLUMN "background_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "developer_profiles_skills" ALTER COLUMN "background_id" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "developer_profiles_skills" ALTER COLUMN "background_id" DROP NOT NULL;