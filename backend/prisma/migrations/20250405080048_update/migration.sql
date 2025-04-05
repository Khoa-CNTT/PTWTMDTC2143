/*
  Warnings:

  - Made the column `weightUnit` on table `product_variants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product_variants` MODIFY `weightUnit` ENUM('GRAMS', 'KILOS', 'POUNDS', 'OUNCES') NOT NULL DEFAULT 'GRAMS';
