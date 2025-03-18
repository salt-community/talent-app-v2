CREATE TABLE "developer_profiles_jobs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "developer_profiles_jobs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"developerProfile_id" uuid,
	"organization" varchar NOT NULL,
	"date" varchar NOT NULL,
	"role" varchar NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "new_developer_profiles_educations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "new_developer_profiles_educations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"developerProfile_id" uuid,
	"organization" varchar NOT NULL,
	"date" varchar NOT NULL,
	"role" varchar NOT NULL,
	"description" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "developer_profiles_jobs" ADD CONSTRAINT "developer_profiles_jobs_developerProfile_id_developer_profiles_id_fk" FOREIGN KEY ("developerProfile_id") REFERENCES "public"."developer_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "new_developer_profiles_educations" ADD CONSTRAINT "new_developer_profiles_educations_developerProfile_id_developer_profiles_id_fk" FOREIGN KEY ("developerProfile_id") REFERENCES "public"."developer_profiles"("id") ON DELETE cascade ON UPDATE no action;