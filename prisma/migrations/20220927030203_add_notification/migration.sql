-- CreateTable
CREATE TABLE `NotificationObject` (
    `id` INTEGER NOT NULL,
    `entity_type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL,
    `notification_object_id` INTEGER NOT NULL,
    `notifier_id` INTEGER NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationChange` (
    `id` INTEGER NOT NULL,
    `notification_object_id` INTEGER NOT NULL,
    `actor_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NotificationObject` ADD CONSTRAINT `NotificationObject_entity_type_id_fkey` FOREIGN KEY (`entity_type_id`) REFERENCES `EntityType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_notification_object_id_fkey` FOREIGN KEY (`notification_object_id`) REFERENCES `NotificationObject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_notifier_id_fkey` FOREIGN KEY (`notifier_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationChange` ADD CONSTRAINT `NotificationChange_notification_object_id_fkey` FOREIGN KEY (`notification_object_id`) REFERENCES `NotificationObject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationChange` ADD CONSTRAINT `NotificationChange_actor_id_fkey` FOREIGN KEY (`actor_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
