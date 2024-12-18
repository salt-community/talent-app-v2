CREATE TABLE IF NOT EXISTS "bobo" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bobo_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"background_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"level" integer DEFAULT 5 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "toto" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "toto_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"background_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"level" integer DEFAULT 5 NOT NULL,
	"fsadf" integer DEFAULT 5 NOT NULL
);
--> statement-breakpoint
DROP TABLE "soso" CASCADE;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bobo" ADD CONSTRAINT "bobo_background_id_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "toto" ADD CONSTRAINT "toto_background_id_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
