/*
  Warnings:

  - Added the required column `latitude` to the `Venda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Venda` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Venda" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "dataVenda" DATETIME NOT NULL,
    "valorTotal" DECIMAL NOT NULL
);
INSERT INTO "new_Venda" ("dataVenda", "id", "valorTotal") SELECT "dataVenda", "id", "valorTotal" FROM "Venda";
DROP TABLE "Venda";
ALTER TABLE "new_Venda" RENAME TO "Venda";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
