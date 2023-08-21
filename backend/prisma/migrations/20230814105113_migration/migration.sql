-- CreateTable
CREATE TABLE "clinics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL,
    "modifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "validTill" DATETIME NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "timeZone" TEXT NOT NULL,
    "defaultClinic" BOOLEAN NOT NULL DEFAULT false,
    "employeesId" INTEGER,
    CONSTRAINT "clinics_employeesId_fkey" FOREIGN KEY ("employeesId") REFERENCES "Employees" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
