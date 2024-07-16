/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_fromPhone_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_toPhone_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "phone",
ADD COLUMN     "email" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromPhone_fkey" FOREIGN KEY ("fromPhone") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_toPhone_fkey" FOREIGN KEY ("toPhone") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
