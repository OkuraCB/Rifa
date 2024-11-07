-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `_RifaToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RifaToUser_AB_unique`(`A`, `B`),
    INDEX `_RifaToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RifaToUser` ADD CONSTRAINT `_RifaToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `rifas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RifaToUser` ADD CONSTRAINT `_RifaToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
