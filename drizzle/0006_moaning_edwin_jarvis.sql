ALTER TABLE "backgrounds" RENAME TO "developer_profiles_backgrounds";--> statement-breakpoint
ALTER TABLE "background_educations" RENAME TO "developer_profiles_educations";--> statement-breakpoint
ALTER TABLE "background_languages" RENAME TO "developer_profiles_languages";--> statement-breakpoint
ALTER TABLE "background_skills" RENAME TO "developer_profiles_skills";--> statement-breakpoint
ALTER TABLE "developer_profiles_educations" DROP CONSTRAINT "background_educations_background_id_backgrounds_id_fk";
--> statement-breakpoint
ALTER TABLE "developer_profiles_languages" DROP CONSTRAINT "background_languages_background_id_backgrounds_id_fk";
--> statement-breakpoint
ALTER TABLE "developer_profiles_skills" DROP CONSTRAINT "background_skills_background_id_backgrounds_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "developer_profiles_educations" ADD CONSTRAINT "developer_profiles_educations_background_id_developer_profiles_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."developer_profiles_backgrounds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "developer_profiles_languages" ADD CONSTRAINT "developer_profiles_languages_background_id_developer_profiles_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."developer_profiles_backgrounds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "developer_profiles_skills" ADD CONSTRAINT "developer_profiles_skills_background_id_developer_profiles_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."developer_profiles_backgrounds"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
