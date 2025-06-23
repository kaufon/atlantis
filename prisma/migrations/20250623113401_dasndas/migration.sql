/*
  Warnings:

  - You are about to drop the `hostings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isHosted` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `customers` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `accommodations` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "hostings";
PRAGMA foreign_keys=on;

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
    "customerId" TEXT NOT NULL,
    CONSTRAINT "accommodations_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_accommodations" ("coupleBeds", "createdAt", "garages", "hasAirConditioning", "id", "name", "singleBeds", "suites") SELECT "coupleBeds", "createdAt", "garages", "hasAirConditioning", "id", "name", "singleBeds", "suites" FROM "accommodations";
DROP TABLE "accommodations";
ALTER TABLE "new_accommodations" RENAME TO "accommodations";
CREATE TABLE "new_customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "socialName" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "registrationDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guardianId" TEXT,
    CONSTRAINT "customers_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "customers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_customers" ("birthDate", "createdAt", "id", "name", "registrationDate", "socialName") SELECT "birthDate", "createdAt", "id", "name", "registrationDate", "socialName" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
