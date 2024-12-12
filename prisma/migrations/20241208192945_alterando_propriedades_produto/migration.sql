/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `imagemUrl` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "precoUnidade" DECIMAL NOT NULL,
    "quantidade" INTEGER NOT NULL
);
INSERT INTO "new_Produto" ("id", "nome", "precoUnidade", "quantidade") SELECT "id", "nome", "precoUnidade", "quantidade" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
