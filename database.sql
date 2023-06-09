
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "favorites" (
	"id" serial NOT NULL,
	"user_id" INT REFERENCES "user",
	"event_id" varchar(255) NOT NULL,
	"event_name" varchar(255) NOT NULL,
	"venue" varchar(255) NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"date" varchar(255) NOT NULL,
	"tickets" varchar(255) NOT NULL,
	"attended" BOOLEAN DEFAULT 'false'
);

--unique index ensures a user can't add same event more than once
CREATE UNIQUE INDEX ind_user_event_id
ON "favorites" ("user_id", "event_id");


