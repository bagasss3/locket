-- AlterTable
ALTER TABLE `event_organizer` MODIFY `photo` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `participant` MODIFY `gender` VARCHAR(191) NULL,
    MODIFY `birth_date` DATETIME(3) NULL,
    MODIFY `photo` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NULL;
