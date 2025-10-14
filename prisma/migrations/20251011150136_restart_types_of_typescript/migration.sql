/*
  Warnings:

  - You are about to drop the column `technicianId` on the `Ticket` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ticket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "categoryID" INTEGER NOT NULL,
    "subCategoryID" INTEGER,
    "userID" INTEGER NOT NULL,
    "technicianID" INTEGER,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ticket_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_subCategoryID_fkey" FOREIGN KEY ("subCategoryID") REFERENCES "SubCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Ticket_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ticket_technicianID_fkey" FOREIGN KEY ("technicianID") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ticket" ("categoryID", "createdAt", "description", "id", "publicID", "status", "subCategoryID", "title", "updatedAt", "userID") SELECT "categoryID", "createdAt", "description", "id", "publicID", "status", "subCategoryID", "title", "updatedAt", "userID" FROM "Ticket";
DROP TABLE "Ticket";
ALTER TABLE "new_Ticket" RENAME TO "Ticket";
CREATE UNIQUE INDEX "Ticket_publicID_key" ON "Ticket"("publicID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
