/*
  Warnings:

  - You are about to drop the column `customerId` on the `accommodations` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_accommodations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "singleBeds" INTEGER NOT NULL,
    "coupleBeds" INTEGER NOT NULL,
    "suites" INTEGER NOT NULL,
    "garages" INTEGER NOT NULL,
    "hasAirConditioning" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "QuantityAvailable" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_accommodations" ("QuantityAvailable", "coupleBeds", "createdAt", "garages", "hasAirConditioning", "id", "name", "singleBeds", "suites") SELECT "QuantityAvailable", "coupleBeds", "createdAt", "garages", "hasAirConditioning", "id", "name", "singleBeds", "suites" FROM "accommodations";
DROP TABLE "accommodations";
ALTER TABLE "new_accommodations" RENAME TO "accommodations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
