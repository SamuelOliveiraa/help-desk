/*
  Warnings:

  - You are about to drop the `WorkingHours` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "workingHours" JSONB;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WorkingHours";
PRAGMA foreign_keys=on;
