/*
  Warnings:

  - Added the required column `energy` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('Low', 'Normal', 'High');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "energy" "Energy" NOT NULL,
ADD COLUMN     "size" "Size" NOT NULL;
