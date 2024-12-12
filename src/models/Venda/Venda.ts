import { UUID } from "crypto";
import { ProdutoCarrinho } from "../ProdutoCarrinho/ProdutoCarrinho";

export type Venda = {
  id: UUID;
  latitude: number;
  logitude: number;
  dataVenda: Date;
  valorTotal: number;
  produtosVendidos: ProdutoCarrinho[];
};
