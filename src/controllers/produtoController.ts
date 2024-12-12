import { UUID } from "crypto";
import prisma from "../db/db";
import { ProdutoCreateDTO } from "../models/Produto/DTO/ProdutoCreateDTO";

export const resgatarProdutos = async () => {
  // Implementar lógica para resgatar todos os produtos do Prisma
  try {
    const produtos = await prisma.produto.findMany();
    console.log("Produtos resgatados com sucesso!");
    return produtos;
  } catch (e) {
    console.error("Erro ao resgatar produtos: ", e);
    return null;
  }
};

export const resgatarProduto = async (id: string) => {
  // Implementar lógica para resgatar todos os produtos do Prisma
  try {
    const produto = await prisma.produto.findFirst({
      where: {
        id: id,
      },
    });
    console.log("Produto resgatado com sucesso!");
    return produto;
  } catch (e) {
    console.error("Erro ao resgatar produto: ", e);
    return null;
  }
};

export const criarProduto = async (produto: ProdutoCreateDTO) => {
  // Implementar lógica para criar um produto e salvar no Prisma
  try {
    const produtoCriado = await prisma.produto.create({
      data: produto,
    });
    console.log("Produto criado com sucesso!");
    return produtoCriado;
  } catch (e) {
    console.error("Erro ao criar produto: ", e);
    return null;
  }
};

export const removerProduto = async (uuid: string) => {
  // Implementar lógica para remover um produto do Prisma
  try {
    const produtoRemovido = await prisma.produto.delete({
      where: {
        id: uuid,
      },
    });
    console.log("Produto removido com sucesso!");
    return produtoRemovido;
  } catch (e) {
    console.error("Erro ao remover produto: ", e);
    return null;
  }
};

export const atualizarQuantidadeProduto = async (
  uuid: string,
  quantidade: number
) => {
  try {
    const produtoAtualizado = await prisma.produto.update({
      where: {
        id: uuid,
      },
      data: {
        quantidade: quantidade,
      },
    });
    console.log("Produto atualizado com sucesso!");
    console.log(produtoAtualizado);
    return produtoAtualizado;
  } catch (e) {
    console.error("Erro ao atualizar quantidade do produto: ", e);
    return null;
  }
};
