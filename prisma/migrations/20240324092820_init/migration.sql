/*
  Warnings:

  - You are about to drop the column `details` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "details";

-- DropTable
DROP TABLE "admin";

-- CreateTable
CREATE TABLE "product_details" (
    "id" SERIAL NOT NULL,
    "details" JSONB NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "product_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
