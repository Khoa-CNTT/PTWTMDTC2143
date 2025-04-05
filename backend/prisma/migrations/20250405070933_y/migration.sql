/*
  Warnings:

  - You are about to drop the column `grams` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - Added the required column `title` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_variants` DROP COLUMN `grams`,
    DROP COLUMN `title`,
    ADD COLUMN `dimensions` VARCHAR(191) NULL,
    ADD COLUMN `weightUnit` ENUM('g', 'kg', 'lb', 'oz') NULL DEFAULT 'g';

-- AlterTable
ALTER TABLE `products` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
