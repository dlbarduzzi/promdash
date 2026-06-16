CREATE TYPE "public"."severities" AS ENUM('disabled', 'info', 'minor', 'warning', 'major', 'critical');--> statement-breakpoint
CREATE TABLE "alert" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"expr" text NOT NULL,
	"for" text NOT NULL,
	"severity" "severities" NOT NULL,
	"action" text NOT NULL,
	"auto_page" boolean DEFAULT false,
	"clusters" text NOT NULL,
	"component" text NOT NULL,
	"customer_impacting" boolean DEFAULT false,
	"disable_moogsoft" boolean DEFAULT false,
	"microservice" text NOT NULL,
	"namespace" text NOT NULL,
	"notification_groups_lab" text NOT NULL,
	"notification_groups_prod" text NOT NULL,
	"summary" text NOT NULL,
	"owner" text NOT NULL,
	"user" text NOT NULL,
	"dashboard" text NOT NULL,
	"business" text NOT NULL,
	"product" text NOT NULL,
	"platform" text NOT NULL,
	"created_by" text NOT NULL,
	"updated_by" text NOT NULL,
	"custom_fields" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "alert_namespace_microservice_unique_idx" ON "alert" USING btree ("namespace","microservice");