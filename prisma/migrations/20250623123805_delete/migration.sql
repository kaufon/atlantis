-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "socialName" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "registrationDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guardianId" TEXT,
    CONSTRAINT "customers_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_customers" ("birthDate", "createdAt", "guardianId", "id", "name", "registrationDate", "socialName") SELECT "birthDate", "createdAt", "guardianId", "id", "name", "registrationDate", "socialName" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
