/*
  Warnings:

  - You are about to drop the `test_table` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN     "user_id" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "test_table";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "notfound" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
