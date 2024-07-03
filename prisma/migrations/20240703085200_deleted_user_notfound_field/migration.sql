/*
  Warnings:

  - You are about to drop the column `notfound` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "message" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "user_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "notfound";
