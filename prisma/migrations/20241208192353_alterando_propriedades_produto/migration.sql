/*
  Warnings:

  - You are about to drop the column `image_url` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `preco_unidade` on the `Produto` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoUnidade` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ProdutoCarrinho" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produto" TEXT NOT NULL,
    "quantidadeVendida" INTEGER NOT NULL,
    "valorPago" DECIMAL NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "precoUnidade" DECIMAL NOT NULL,
    "quantidade" INTEGER NOT NULL
);
INSERT INTO "new_Produto" ("id", "nome", "quantidade") SELECT "id", "nome", "quantidade" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
