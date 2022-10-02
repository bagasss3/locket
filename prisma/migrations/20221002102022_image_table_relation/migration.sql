/*
  Warnings:

  - You are about to drop the column `photo` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `event_organizer` table. All the data in the column will be lost.
  - You are about to alter the column `version` on the `image` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `photo` on the `participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `photo`,
    ADD COLUMN `image_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `event_organizer` DROP COLUMN `photo`,
    ADD COLUMN `image_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `image` MODIFY `version` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `participant` DROP COLUMN `photo`,
    ADD COLUMN `image_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Event_Organizer` ADD CONSTRAINT `Event_Organizer_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
