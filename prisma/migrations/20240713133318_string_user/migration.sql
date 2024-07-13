/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_fromPhone_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_toPhone_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "fromPhone" SET DATA TYPE TEXT,
ALTER COLUMN "toPhone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("phone");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromPhone_fkey" FOREIGN KEY ("fromPhone") REFERENCES "User"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_toPhone_fkey" FOREIGN KEY ("toPhone") REFERENCES "User"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;
