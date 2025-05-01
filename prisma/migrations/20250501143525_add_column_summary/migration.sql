-- DropForeignKey
ALTER TABLE `News` DROP FOREIGN KEY `News_category_id_fkey`;

-- DropIndex
DROP INDEX `News_category_id_fkey` ON `News`;

-- AlterTable
ALTER TABLE `News` ADD COLUMN `summary` TEXT NULL,
    MODIFY `category_id` INTEGER NULL,
    MODIFY `image` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
