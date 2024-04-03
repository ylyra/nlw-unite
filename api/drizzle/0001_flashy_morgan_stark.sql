CREATE TABLE IF NOT EXISTS "attendees" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"event_id" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attendees" ADD CONSTRAINT "attendees_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
