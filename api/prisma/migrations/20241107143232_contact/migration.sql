/*
  Warnings:

  - You are about to drop the column `active` on the `tokens` table. All the data in the column will be lost.
  - Added the required column `contact` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tokens` DROP COLUMN `active`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `contact` TEXT NOT NULL;
