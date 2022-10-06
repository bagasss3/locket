/*
  Warnings:

  - A unique constraint covering the columns `[image_id]` on the table `Event_Organizer_Precondition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image_id` to the `Event_Organizer_Precondition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_organizer_precondition` ADD COLUMN `image_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Event_Organizer_Precondition_image_id_key` ON `Event_Organizer_Precondition`(`image_id`);

-- AddForeignKey
ALTER TABLE `Event_Organizer_Precondition` ADD CONSTRAINT `Event_Organizer_Precondition_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
