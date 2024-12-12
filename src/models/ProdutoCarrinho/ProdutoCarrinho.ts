import { UUID } from "crypto";

export type ProdutoCarrinho = {
  id: UUID;
  produto: UUID;
  venda: UUID;
  quantidadeVendida: Number;
  valorPago: Number;
};
