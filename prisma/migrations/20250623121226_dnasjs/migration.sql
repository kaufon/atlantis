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
    CONSTRAINT "accommodations_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_accommodations" ("coupleBeds", "createdAt", "customerId", "garages", "hasAirConditioning", "id", "name", "singleBeds", "suites") SELECT "coupleBeds", "createdAt", "customerId", "garages", "hasAirConditioning", "id", "name", "singleBeds", "suites" FROM "accommodations";
DROP TABLE "accommodations";
ALTER TABLE "new_accommodations" RENAME TO "accommodations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
