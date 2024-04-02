CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"details" text,
	"slug" text NOT NULL,
	"maximum_attendees" integer,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
