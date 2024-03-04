/*
  Warnings:

  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Seat` DROP FOREIGN KEY `Seat_rifa_id_fkey`;

-- DropTable
DROP TABLE `Seat`;

-- CreateTable
CREATE TABLE `seats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seat` INTEGER NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `rifa_id` INTEGER NOT NULL,

    INDEX `seats_rifa_id_idx`(`rifa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `seats` ADD CONSTRAINT `seats_rifa_id_fkey` FOREIGN KEY (`rifa_id`) REFERENCES `rifas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
