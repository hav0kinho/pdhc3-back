import prisma from "../db/db";
import { ProdutoCarrinhoCreateDTO } from "../models/ProdutoCarrinho/DTO/ProdutoCarrinhoCreateDTO";
import { ProdutoCarrinho } from "../models/ProdutoCarrinho/ProdutoCarrinho";
import { VendaCreateDTO } from "../models/Venda/DTO/VendaCreateDTO";
import { Venda } from "../models/Venda/Venda";
import {
  criarProdutoCarrinho,
  resgatarProdutosCarrinhoDeUmaVenda,
} from "./produtoCarrinhoController";
import { reduzirQuantidadeProduto, resgatarProduto } from "./produtoController";

// Função para resgatar todas as vendas com seus produtos
export const resgatarVendas = async () => {
  try {
    const vendas = await prisma.venda.findMany({
      include: {
        produtosVendidos: true,
      },
    }); // Resgatando todas as vendas e produtos vendidos

    console.log("Vendas resgatadas com sucesso!");
    return vendas;
  } catch (e) {
    console.error("Erro ao resgatar vendas: ", e);
    return null;
  }
};

// Função para criar uma venda
export const criarVenda = async (venda: VendaCreateDTO) => {
  if (venda.produtosVendidos.length === 0) {
    console.error(
      "Erro ao criar venda: Nenhum produto foi adicionado ao carrinho"
    );
    return null;
  } // Verifica se há produtos no carrinho enviado.
  try {
    const produtosCarrinho = venda.produtosVendidos;

    const vendaCriada = await prisma.venda.create({
      data: {
        latitude: venda.latitude,
        longitude: venda.longitude,
        dataVenda: venda.dataVenda,
        valorTotal: venda.valorTotal,
      },
    }); // Criando uma nova venda
    console.log("Venda criada com sucesso!");

    venda.produtosVendidos.map(async (produtoVenda) => {
      await reduzirQuantidadeProduto(
        produtoVenda.produto,
        produtoVenda.quantidadeVendida
      );
    }); // Reduz a quantidade de produtos no estoque

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

// Função para resgatar os produtos de uma venda
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
