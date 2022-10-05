/*
  Warnings:

  - You are about to drop the column `screenshot` on the `eventprecondition` table. All the data in the column will be lost.
  - Added the required column `image_id` to the `EventPrecondition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eventparticipant` ADD COLUMN `precondition` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `eventprecondition` DROP COLUMN `screenshot`,
    ADD COLUMN `image_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `EventPrecondition` ADD CONSTRAINT `EventPrecondition_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Image`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
