/*
  Warnings:

  - You are about to alter the column `weightUnit` on the `product_variants` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(17))` to `Enum(EnumId(10))`.

*/
-- AlterTable
ALTER TABLE `product_variants` MODIFY `weightUnit` ENUM('GRAMS', 'KILOS', 'POUNDS', 'OUNCES') NULL DEFAULT 'GRAMS';
