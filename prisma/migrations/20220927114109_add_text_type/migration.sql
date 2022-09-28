/*
  Warnings:

  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `description` TEXT NOT NULL,
    MODIFY `photo` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `event_organizer` MODIFY `photo` TEXT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `eventcomment` MODIFY `comment` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `eventprecondition` MODIFY `screenshot` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `participant` MODIFY `photo` TEXT NULL;

-- AlterTable
ALTER TABLE `session` MODIFY `access_token` TEXT NOT NULL,
    MODIFY `refresh_token` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `token` MODIFY `token` TEXT NOT NULL;
