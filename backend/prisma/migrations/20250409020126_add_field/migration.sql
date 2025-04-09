/*
  Warnings:

  - A unique constraint covering the columns `[variantId,warehouseId]` on the table `inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unitPrice` to the `order_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `inventory` DROP FOREIGN KEY `inventory_variantId_fkey`;

-- DropIndex
DROP INDEX `inventory_variantId_key` ON `inventory`;

-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `isSelected` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `order_item` ADD COLUMN `unitPrice` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `inventory_variantId_warehouseId_key` ON `inventory`(`variantId`, `warehouseId`);

