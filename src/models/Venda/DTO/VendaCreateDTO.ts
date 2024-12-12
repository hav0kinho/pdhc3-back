import { ProdutoCarrinhoCreateDTO } from "../../ProdutoCarrinho/DTO/ProdutoCarrinhoCreateDTO";

export type VendaCreateDTO = {
  latitude: number;
  longitude: number;
  dataVenda: Date;
  valorTotal: number;
  produtosVendidos: ProdutoCarrinhoCreateDTO[];
};
