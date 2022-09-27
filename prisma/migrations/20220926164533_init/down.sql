-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `Event_Organizer` DROP FOREIGN KEY `Event_Organizer_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Event_Organizer_Precondition` DROP FOREIGN KEY `Event_Organizer_Precondition_event_organizer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Participant` DROP FOREIGN KEY `Participant_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_event_organizer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_eligibility_id_fkey`;

-- DropForeignKey
ALTER TABLE `EventParticipant` DROP FOREIGN KEY `EventParticipant_participant_id_fkey`;

-- DropForeignKey
ALTER TABLE `EventParticipant` DROP FOREIGN KEY `EventParticipant_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `EventPrecondition` DROP FOREIGN KEY `EventPrecondition_event_participant_id_fkey`;

-- DropForeignKey
ALTER TABLE `EventComment` DROP FOREIGN KEY `EventComment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `EventComment` DROP FOREIGN KEY `EventComment_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `NotificationObject` DROP FOREIGN KEY `NotificationObject_entity_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_notification_object_id_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_notifier_id_fkey`;

-- DropForeignKey
ALTER TABLE `NotificationChange` DROP FOREIGN KEY `NotificationChange_notification_object_id_fkey`;

-- DropForeignKey
ALTER TABLE `NotificationChange` DROP FOREIGN KEY `NotificationChange_actor_id_fkey`;

-- DropTable
DROP TABLE `Session`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `Role`;

-- DropTable
DROP TABLE `Event_Organizer`;

-- DropTable
DROP TABLE `Event_Organizer_Precondition`;

-- DropTable
DROP TABLE `Participant`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Eligibility`;

-- DropTable
DROP TABLE `Event`;

-- DropTable
DROP TABLE `EventParticipant`;

-- DropTable
DROP TABLE `EventPrecondition`;

-- DropTable
DROP TABLE `EventComment`;

-- DropTable
DROP TABLE `EntityType`;

-- DropTable
DROP TABLE `NotificationObject`;

-- DropTable
DROP TABLE `Notification`;

-- DropTable
DROP TABLE `NotificationChange`;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eligibility` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Eligibility_name_key`(`name` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entitytype` (
    `id` INTEGER NOT NULL,
    `entity` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EntityType_entity_key`(`entity` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `id` INTEGER NOT NULL,
    `event_organizer_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date_time` DATETIME(3) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `eligibility_id` INTEGER NOT NULL,

    INDEX `Event_category_id_fkey`(`category_id` ASC),
    INDEX `Event_eligibility_id_fkey`(`eligibility_id` ASC),
    INDEX `Event_event_organizer_id_fkey`(`event_organizer_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_organizer` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Event_Organizer_user_id_key`(`user_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_organizer_precondition` (
    `id` INTEGER NOT NULL,
    `event_organizer_id` INTEGER NOT NULL,

    UNIQUE INDEX `Event_Organizer_Precondition_event_organizer_id_key`(`event_organizer_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventcomment` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `parent_id` INTEGER NOT NULL,
    `mentioned_user` VARCHAR(191) NOT NULL,

    INDEX `EventComment_event_id_fkey`(`event_id` ASC),
    INDEX `EventComment_user_id_fkey`(`user_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventparticipant` (
    `id` INTEGER NOT NULL,
    `participant_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,

    INDEX `EventParticipant_event_id_fkey`(`event_id` ASC),
    INDEX `EventParticipant_participant_id_fkey`(`participant_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventprecondition` (
    `id` INTEGER NOT NULL,
    `event_participant_id` INTEGER NOT NULL,
    `screenshot` VARCHAR(191) NOT NULL,

    INDEX `EventPrecondition_event_participant_id_fkey`(`event_participant_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participant` (
    `id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Participant_phone_number_key`(`phone_number` ASC),
    UNIQUE INDEX `Participant_user_id_key`(`user_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` INTEGER NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `refresh_token_expired_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `Session_user_id_fkey`(`user_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email` ASC),
    INDEX `User_role_id_fkey`(`role_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_eligibility_id_fkey` FOREIGN KEY (`eligibility_id`) REFERENCES `eligibility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_event_organizer_id_fkey` FOREIGN KEY (`event_organizer_id`) REFERENCES `event_organizer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_organizer` ADD CONSTRAINT `Event_Organizer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_organizer_precondition` ADD CONSTRAINT `Event_Organizer_Precondition_event_organizer_id_fkey` FOREIGN KEY (`event_organizer_id`) REFERENCES `event_organizer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eventcomment` ADD CONSTRAINT `EventComment_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eventcomment` ADD CONSTRAINT `EventComment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eventparticipant` ADD CONSTRAINT `EventParticipant_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eventparticipant` ADD CONSTRAINT `EventParticipant_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `participant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eventprecondition` ADD CONSTRAINT `EventPrecondition_event_participant_id_fkey` FOREIGN KEY (`event_participant_id`) REFERENCES `eventparticipant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participant` ADD CONSTRAINT `Participant_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

