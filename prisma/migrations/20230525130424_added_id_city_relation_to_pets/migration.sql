/*
  Warnings:

  - A unique constraint covering the columns `[id,city]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organization_city` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_organization_id_fkey";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "organization_city" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_id_city_key" ON "organizations"("id", "city");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_organization_city_fkey" FOREIGN KEY ("organization_id", "organization_city") REFERENCES "organizations"("id", "city") ON DELETE RESTRICT ON UPDATE CASCADE;
