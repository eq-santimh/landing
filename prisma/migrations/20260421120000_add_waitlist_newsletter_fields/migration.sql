-- AlterTable
ALTER TABLE "waitlist_signups" ADD COLUMN "first_name" TEXT;

-- AlterTable
ALTER TABLE "waitlist_signups" ADD COLUMN "newsletter_interests" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- CreateEnum
CREATE TYPE "NewsletterSubscriptionStatus" AS ENUM ('subscribed', 'unsubscribed');

-- CreateTable
CREATE TABLE "newsletter_subscribers" (
    "id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "interests" TEXT[],
    "status" "NewsletterSubscriptionStatus" NOT NULL DEFAULT 'subscribed',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletter_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscribers_email_key" ON "newsletter_subscribers"("email");

-- CreateIndex
CREATE INDEX "newsletter_subscribers_status_idx" ON "newsletter_subscribers"("status");
