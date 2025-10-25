/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubCategoryTicketsOnTicket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `categoryID` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `serviceID` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_title_key";

-- DropIndex
DROP INDEX "SubCategory_title_key";

-- DropIndex
DROP INDEX "_SubCategoryTicketsOnTicket_B_index";

-- DropIndex
DROP INDEX "_SubCategoryTicketsOnTicket_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SubCategory";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_SubCategoryTicketsOnTicket";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "SubService" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "value" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "_SubServiceTicketsOnTicket" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SubServiceTicketsOnTicket_A_fkey" FOREIGN KEY ("A") REFERENCES "SubService" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SubServiceTicketsOnTicket_B_fkey" FOREIGN KEY ("B") REFERENCES "Ticket" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "serviceID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "technicianID" INTEGER,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ticket_serviceID_fkey" FOREIGN KEY ("serviceID") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_technicianID_fkey" FOREIGN KEY ("technicianID") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ticket" ("createdAt", "description", "id", "publicID", "status", "technicianID", "title", "updatedAt", "userID") SELECT "createdAt", "description", "id", "publicID", "status", "technicianID", "title", "updatedAt", "userID" FROM "Ticket";
DROP TABLE "Ticket";
ALTER TABLE "new_Ticket" RENAME TO "Ticket";
CREATE UNIQUE INDEX "Ticket_publicID_key" ON "Ticket"("publicID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Service_title_key" ON "Service"("title");

-- CreateIndex
CREATE UNIQUE INDEX "SubService_title_key" ON "SubService"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_SubServiceTicketsOnTicket_AB_unique" ON "_SubServiceTicketsOnTicket"("A", "B");

-- CreateIndex
CREATE INDEX "_SubServiceTicketsOnTicket_B_index" ON "_SubServiceTicketsOnTicket"("B");
