ALTER TABLE "developer_profiles_educations" DROP CONSTRAINT "developer_profiles_educations_developerProfile_id_temp_developer_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "developer_profiles_languages" DROP CONSTRAINT "developer_profiles_languages_developerProfile_id_temp_developer_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "developer_profiles_skills" DROP CONSTRAINT "developer_profiles_skills_developerProfile_id_temp_developer_profiles_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "developer_profiles_educations" ADD CONSTRAINT "developer_profiles_educations_developerProfile_id_developer_profiles_id_fk" FOREIGN KEY ("developerProfile_id") REFERENCES "public"."developer_profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "developer_profiles_languages" ADD CONSTRAINT "developer_profiles_languages_developerProfile_id_developer_profiles_id_fk" FOREIGN KEY ("developerProfile_id") REFERENCES "public"."developer_profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "developer_profiles_skills" ADD CONSTRAINT "developer_profiles_skills_developerProfile_id_developer_profiles_id_fk" FOREIGN KEY ("developerProfile_id") REFERENCES "public"."developer_profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
