/*
  Warnings:

  - You are about to drop the column `roomId` on the `user_room` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,room_id]` on the table `user_room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room_id` to the `user_room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_room" DROP CONSTRAINT "user_room_roomId_fkey";

-- DropForeignKey
ALTER TABLE "user_room" DROP CONSTRAINT "user_room_userId_fkey";

-- DropIndex
DROP INDEX "user_room_userId_roomId_key";

-- AlterTable
ALTER TABLE "user_room" DROP COLUMN "roomId",
DROP COLUMN "userId",
ADD COLUMN     "room_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_room_user_id_room_id_key" ON "user_room"("user_id", "room_id");

-- AddForeignKey
ALTER TABLE "user_room" ADD CONSTRAINT "user_room_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_room" ADD CONSTRAINT "user_room_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
