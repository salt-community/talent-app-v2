ALTER TABLE "developer_profiles_educations" ADD COLUMN "developerProfile_id" uuid;--> statement-breakpoint
ALTER TABLE "developer_profiles_languages" ADD COLUMN "developerProfile_id" uuid;--> statement-breakpoint
ALTER TABLE "developer_profiles_skills" ADD COLUMN "developerProfile_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "developer_profiles_educations" ADD CONSTRAINT "developer_profiles_educations_developerProfile_id_temp_developer_profiles_id_fk" FOREIGN KEY ("developerProfile_id") REFERENCES "public"."temp_developer_profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "developer_profiles_languages" ADD CONSTRAINT "developer_profiles_languages_developerProfile_id_temp_developer_profiles_id_fk" FOREIGN KEY ("developerProfile_id") REFERENCES "public"."temp_developer_profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "developer_profiles_skills" ADD CONSTRAINT "developer_profiles_skills_developerProfile_id_temp_developer_profiles_id_fk" FOREIGN KEY ("developerProfile_id") REFERENCES "public"."temp_developer_profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
