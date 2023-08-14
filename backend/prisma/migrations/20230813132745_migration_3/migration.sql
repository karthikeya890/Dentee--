-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL,
    "modifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Employees" ("active", "createdAt", "deletedAt", "email", "id", "modifiedAt", "name", "password", "role") SELECT "active", "createdAt", "deletedAt", "email", "id", "modifiedAt", "name", "password", "role" FROM "Employees";
DROP TABLE "Employees";
ALTER TABLE "new_Employees" RENAME TO "Employees";
CREATE UNIQUE INDEX "Employees_email_key" ON "Employees"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
