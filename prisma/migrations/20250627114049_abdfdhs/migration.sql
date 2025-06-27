-- CreateTable
CREATE TABLE "Hostings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT,
    "accommodationId" TEXT,
    CONSTRAINT "Hostings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Hostings_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "accommodations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
