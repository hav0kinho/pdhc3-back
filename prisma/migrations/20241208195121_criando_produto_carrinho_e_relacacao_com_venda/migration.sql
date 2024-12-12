/*
  Warnings:

  - Added the required column `vendaId` to the `ProdutoCarrinho` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Venda" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataVenda" DATETIME NOT NULL,
    "valorTotal" DECIMAL NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProdutoCarrinho" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produto" TEXT NOT NULL,
    "quantidadeVendida" INTEGER NOT NULL,
    "valorPago" DECIMAL NOT NULL,
    "vendaId" TEXT NOT NULL,
    CONSTRAINT "ProdutoCarrinho_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProdutoCarrinho" ("id", "produto", "quantidadeVendida", "valorPago") SELECT "id", "produto", "quantidadeVendida", "valorPago" FROM "ProdutoCarrinho";
DROP TABLE "ProdutoCarrinho";
ALTER TABLE "new_ProdutoCarrinho" RENAME TO "ProdutoCarrinho";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
