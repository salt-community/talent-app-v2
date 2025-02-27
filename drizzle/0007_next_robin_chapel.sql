ALTER TABLE "developer_profiles" ADD COLUMN "avatar_url" varchar DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "developer_profiles" ADD COLUMN "title" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "developer_profiles" ADD COLUMN "bio" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "developer_profiles" ADD COLUMN "links" jsonb NOT NULL;