import { UUID } from "crypto";

export type ProdutoCarrinhoCreateDTO = {
  produto: UUID;
  quantidadeVendida: number;
  valorPago: number;
};
