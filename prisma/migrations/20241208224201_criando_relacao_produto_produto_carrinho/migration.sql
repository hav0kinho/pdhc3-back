/*
  Warnings:

  - You are about to drop the column `produto` on the `ProdutoCarrinho` table. All the data in the column will be lost.
  - Added the required column `produtoId` to the `ProdutoCarrinho` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProdutoCarrinho" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantidadeVendida" INTEGER NOT NULL,
    "valorPago" DECIMAL NOT NULL,
    "vendaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    CONSTRAINT "ProdutoCarrinho_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProdutoCarrinho_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProdutoCarrinho" ("id", "quantidadeVendida", "valorPago", "vendaId") SELECT "id", "quantidadeVendida", "valorPago", "vendaId" FROM "ProdutoCarrinho";
DROP TABLE "ProdutoCarrinho";
ALTER TABLE "new_ProdutoCarrinho" RENAME TO "ProdutoCarrinho";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
