import prisma from "../db/db";
import { ProdutoCarrinhoCreateDTO } from "../models/ProdutoCarrinho/DTO/ProdutoCarrinhoCreateDTO";
import { ProdutoCarrinho } from "../models/ProdutoCarrinho/ProdutoCarrinho";
import { VendaCreateDTO } from "../models/Venda/DTO/VendaCreateDTO";
import { Venda } from "../models/Venda/Venda";
import {
  criarProdutoCarrinho,
  resgatarProdutosCarrinhoDeUmaVenda,
  resgatarProdutosCarrinhoDeUmProduto,
} from "./produtoCarrinhoController";

export const resgatarVendas = async () => {
  // Implementar lógica para resgatar todas as vendas do Prisma
  try {
    const vendas = await prisma.venda.findMany({
      include: {
        produtosVendidos: true,
      },
    });

    console.log("Vendas resgatadas com sucesso!");
    return vendas;
  } catch (e) {
    console.error("Erro ao resgatar vendas: ", e);
    return null;
  }
};

export const criarVenda = async (venda: VendaCreateDTO) => {
  try {
    const produtosCarrinho = venda.produtosVendidos;

    const vendaCriada = await prisma.venda.create({
      data: {
        latitude: venda.latitude,
        longitude: venda.longitude,
        dataVenda: venda.dataVenda,
        valorTotal: venda.valorTotal,
      },
    });
    console.log("Venda criada com sucesso!");

    const produtosCarrinhosCriados = produtosCarrinho.map(async (produto) => {
      const produtoCarrinhoCriado = await criarProdutoCarrinho(
        produto,
        vendaCriada.id
      );
      return produtoCarrinhoCriado;
    });

    return vendaCriada;
  } catch (e) {
    console.error("Erro ao criar venda: ", e);
    return null;
  }
};

export const resgatarProdutosDeUmaVenda = async (idVenda: string) => {
  try {
    const produtosCarrinho = await resgatarProdutosCarrinhoDeUmaVenda(idVenda);
    if (produtosCarrinho) {
      const produtos = produtosCarrinho.map(
        (produtoCarrinho) => produtoCarrinho.produto
      );
      console.log("Produtos da venda resgatados com sucesso!");
      return produtos;
    }
  } catch (e) {
    console.error("Erro ao resgatar produtos da venda: ", e);
    return null;
  }
};

// export const criarVenda = async (venda: VendaCreateDTO) => {
//   // Implementar lógica para criar um produto e salvar no Prisma
//   try {
//     const vendaCriada = await prisma.venda.create({
//       data: venda,
//     });
//     console.log("Venda criada com sucesso!");
//     return vendaCriada;
//   } catch (e) {
//     console.error("Erro ao criar venda: ", e);
//     return null;
//   }
// };

// export const criarVenda = async (venda: VendaCreateDTO) => {
//   // Implementar lógica para criar um produto e salvar no Prisma
//   try{
//     const produtosCarrinho = venda.produtosVendidos;
//     produtosCarrinho.map(async (produto) => {
//       await prisma.produtoCarrinho.create({
//         data: produto
//       })
//     })
//     console.log("Venda criada com sucesso!");
//     return vendaCriada;
//   }
// };
