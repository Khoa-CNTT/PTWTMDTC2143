/*
  Warnings:

  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product_variants` ADD COLUMN `compare_at_price` INTEGER NULL,
    ADD COLUMN `grams` DOUBLE NULL,
    ADD COLUMN `weight` DOUBLE NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `price`;
