/*
  Warnings:

  - You are about to drop the `product_variant_option_values` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product_variant_option_values` DROP FOREIGN KEY `product_variant_option_values_optionValueId_fkey`;

-- DropForeignKey
ALTER TABLE `product_variant_option_values` DROP FOREIGN KEY `product_variant_option_values_variantId_fkey`;

-- DropTable
DROP TABLE `product_variant_option_values`;

-- CreateTable
CREATE TABLE `variant_option_values` (
    `id` VARCHAR(191) NOT NULL,
    `variantId` VARCHAR(191) NOT NULL,
    `optionValueId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `variant_option_values_variantId_optionValueId_key`(`variantId`, `optionValueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `variant_option_values` ADD CONSTRAINT `variant_option_values_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `product_variants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `variant_option_values` ADD CONSTRAINT `variant_option_values_optionValueId_fkey` FOREIGN KEY (`optionValueId`) REFERENCES `option_values`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
