/*
  Warnings:

  - You are about to drop the column `payload` on the `tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tokens` DROP COLUMN `payload`,
    ADD COLUMN `token` VARCHAR(3000) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email_UNIQUE` ON `user`(`email`);
