-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "preco_unidade" DECIMAL NOT NULL,
    "quantidade" INTEGER NOT NULL
);
