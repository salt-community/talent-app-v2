CREATE TABLE IF NOT EXISTS "soso" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "soso_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"background_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"level" integer DEFAULT 5 NOT NULL
);
--> statement-breakpoint
DROP TABLE "test" CASCADE;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "soso" ADD CONSTRAINT "soso_background_id_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
