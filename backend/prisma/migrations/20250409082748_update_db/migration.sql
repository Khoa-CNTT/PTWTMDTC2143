/*
  Warnings:

  - You are about to drop the column `discount` on the `vouchers` table. All the data in the column will be lost.
  - Added the required column `discountValue` to the `vouchers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `voucher_usages` MODIFY `usedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `vouchers` DROP COLUMN `discount`,
    ADD COLUMN `discountValue` INTEGER NOT NULL,
    ADD COLUMN `isPublic` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `maxDiscount` INTEGER NULL;
