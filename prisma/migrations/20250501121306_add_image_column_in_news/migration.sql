/*
  Warnings:

  - Added the required column `image` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    MODIFY `content` TEXT NOT NULL;
