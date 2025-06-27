-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hostings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT,
    "accommodationId" TEXT,
    CONSTRAINT "Hostings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Hostings_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "accommodations" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Hostings" ("accommodationId", "createdAt", "customerId", "endDate", "id", "startDate") SELECT "accommodationId", "createdAt", "customerId", "endDate", "id", "startDate" FROM "Hostings";
DROP TABLE "Hostings";
ALTER TABLE "new_Hostings" RENAME TO "Hostings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
