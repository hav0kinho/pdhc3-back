import { UUID } from "crypto";
import prisma from "../db/db";
import { ProdutoCarrinhoCreateDTO } from "../models/ProdutoCarrinho/DTO/ProdutoCarrinhoCreateDTO";
import { ProdutoCarrinho } from "../models/ProdutoCarrinho/ProdutoCarrinho";

export const resgatarProdutosCarrinho = async () => {
  try {
    const produtosCarrinho = await prisma.produtoCarrinho.findMany();
    console.log("Produtos do carrinho resgatados com sucesso!");
    return produtosCarrinho;
  } catch (e) {
    console.error("Erro ao resgatar produtos do carrinho: ", e);
    return null;
  }
};

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
    });
    console.log("Registro de carrinho criado com sucesso!");
    return produtoCarrinhoCriado.id;
  } catch (e) {
    console.error("Erro ao criar produto do carrinho: ", e);
  }
};
