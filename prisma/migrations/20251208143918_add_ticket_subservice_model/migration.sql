/*
  Warnings:

  - Changed the type of `value` on the `SubService` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SubService" DROP COLUMN "value",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "TicketSubService" (
    "ticketId" TEXT NOT NULL,
    "subServiceId" TEXT NOT NULL,

    CONSTRAINT "TicketSubService_pkey" PRIMARY KEY ("ticketId","subServiceId")
);

-- AddForeignKey
ALTER TABLE "TicketSubService" ADD CONSTRAINT "TicketSubService_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketSubService" ADD CONSTRAINT "TicketSubService_subServiceId_fkey" FOREIGN KEY ("subServiceId") REFERENCES "SubService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
