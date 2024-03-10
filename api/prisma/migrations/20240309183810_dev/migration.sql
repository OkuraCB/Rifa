/*
  Warnings:

  - You are about to drop the column `state` on the `seats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `seats` DROP COLUMN `state`,
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `pago` BOOLEAN NOT NULL DEFAULT false;
