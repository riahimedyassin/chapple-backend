-- CreateTable
CREATE TABLE "Friend" (
    "id" SERIAL NOT NULL,
    "sent_by_email" TEXT NOT NULL,
    "sent_to_email" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_sent_by_email_fkey" FOREIGN KEY ("sent_by_email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_sent_to_email_fkey" FOREIGN KEY ("sent_to_email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
