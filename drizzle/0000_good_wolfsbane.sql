CREATE TABLE IF NOT EXISTS "rfps" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"title" varchar,
	"data" jsonb,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"email" varchar,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rfps" ADD CONSTRAINT "rfps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
