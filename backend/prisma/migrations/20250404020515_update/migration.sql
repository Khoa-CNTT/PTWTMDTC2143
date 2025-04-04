/*
  Warnings:

  - Added the required column `updatedAt` to the `email_verifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `email_verifications` ADD COLUMN `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

