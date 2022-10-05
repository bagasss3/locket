/*
  Warnings:

  - You are about to drop the column `precondition` on the `eventparticipant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `precondition` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `eventparticipant` DROP COLUMN `precondition`;
