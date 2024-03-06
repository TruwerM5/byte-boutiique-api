/*
  Warnings:

  - You are about to drop the column `quantity` on the `carts` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "quantity";
