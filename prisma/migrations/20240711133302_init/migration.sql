/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `connnected` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `forname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "connnected",
DROP COLUMN "forname",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE BIGINT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("phone");

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "fromPhone" BIGINT NOT NULL,
    "toPhone" BIGINT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromPhone_fkey" FOREIGN KEY ("fromPhone") REFERENCES "User"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_toPhone_fkey" FOREIGN KEY ("toPhone") REFERENCES "User"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;
