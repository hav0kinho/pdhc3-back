import { UUID } from "crypto";
import prisma from "../db/db";
import { ProdutoCarrinhoCreateDTO } from "../models/ProdutoCarrinho/DTO/ProdutoCarrinhoCreateDTO";
import { ProdutoCarrinho } from "../models/ProdutoCarrinho/ProdutoCarrinho";

// Função para resgatar os produtos do carrinho
export const resgatarProdutosCarrinho = async () => {
  try {
    const produtosCarrinho = await prisma.produtoCarrinho.findMany(); // Resgatando todos os produtos do carrinho
    console.log("Produtos do carrinho resgatados com sucesso!");
    return produtosCarrinho;
  } catch (e) {
    console.error("Erro ao resgatar produtos do carrinho: ", e);
    return null;
  }
};

// Função para resgatar os produtos do carrinho de uma venda
export const resgatarProdutosCarrinhoDeUmaVenda = async (idVenda: string) => {
  try {
    const produtosCarrinho = await prisma.produtoCarrinho.findMany({
      where: {
        vendaId: idVenda,
      },
      include: {
        produto: true,
      },
    });
    console.log("Produtos do carrinho resgatados com sucesso!");
    return produtosCarrinho;
  } catch (e) {
    console.error("Erro ao resgatar produtos do carrinho: ", e);
    return null;
  }
};

// Função para resgatar os produtos do carrinho de um produto
export const resgatarProdutosCarrinhoDeUmProduto = async (
  idProduto: string
) => {
  try {
    const produtosCarrinho = await prisma.produtoCarrinho.findMany({
      where: {
        produtoId: idProduto,
      },
    });
    console.log("Produtos do carrinho resgatados com sucesso!");
    return produtosCarrinho;
  } catch (e) {
    console.error("Erro ao resgatar produtos do carrinho: ", e);
    return null;
  }
};

// Função para resgatar um produto do carrinho
export const criarProdutoCarrinho = async (
  produtoCarrinho: ProdutoCarrinhoCreateDTO,
  idVenda: string
) => {
  try {
    const produtoCarrinhoCriado = await prisma.produtoCarrinho.create({
      data: {
        ...produtoCarrinho,
        produto: { connect: { id: produtoCarrinho.produto } },
        venda: { connect: { id: idVenda } },
      },
    }); // Criando um novo ProdutoCarrinho (Entidade de Relacionamento/Intermediária)
    console.log("Registro de carrinho criado com sucesso!");
    return produtoCarrinhoCriado.id;
  } catch (e) {
    console.error("Erro ao criar produto do carrinho: ", e);
  }
};
